from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "app"
COMPONENTS = ROOT / "components"
SCAN_ROOTS = [APP, COMPONENTS, ROOT / "context", ROOT / "lib"]
EXCLUDED_PARTS = {"node_modules", ".next", ".git", "generated"}


def files():
    for base in SCAN_ROOTS:
        if not base.exists():
            continue
        for path in base.rglob("*"):
            if path.is_file() and path.suffix in {".tsx", ".ts", ".json"} and not EXCLUDED_PARTS.intersection(path.parts):
                yield path


def route_from_page(path: Path) -> str:
    rel = path.parent.relative_to(APP).as_posix()
    if rel == ".":
        return "/"
    return "/" + rel


def route_pattern(route: str) -> re.Pattern[str]:
    parts = route.strip("/").split("/") if route != "/" else []
    expression = "^"
    for part in parts:
        if part.startswith("[") and part.endswith("]"):
            expression += r"/[^/]+"
        elif part.startswith("(") and part.endswith(")"):
            expression += "/(?:[^/]+)"
        else:
            expression += "/" + re.escape(part)
    return re.compile(expression + r"/?$")


def normalize_candidate(value: str) -> str:
    value = value.split("#", 1)[0].split("?", 1)[0]
    value = re.sub(r"\$\{[^}]+\}|\[[^]]+\]", "x", value)
    value = re.sub(r"/+$", "", value) or "/"
    return value


def is_internal(value: str) -> bool:
    return value.startswith("/") and not value.startswith(("//", "/api/", "/_next/", "/assets/", "/uploads/"))


def line_number(text: str, offset: int) -> int:
    return text.count("\n", 0, offset) + 1


def main() -> None:
    page_routes = sorted({route_from_page(p) for p in APP.rglob("page.tsx") if not EXCLUDED_PARTS.intersection(p.parts)})
    route_patterns = [(route, route_pattern(route)) for route in page_routes]
    sources = [(p, p.read_text(errors="ignore")) for p in files() if p.suffix in {".tsx", ".ts"}]

    links: list[tuple[str, int, str]] = []
    hardcoded: list[tuple[str, int, str]] = []
    markers: list[tuple[str, int, str]] = []
    translation_keys: set[str] = set()
    key_usage: list[tuple[str, int, str]] = []

    link_patterns = [
        re.compile(r"(?:href|src)\s*=\s*['\"]([^'\"]+)['\"]"),
        re.compile(r"(?:router\.(?:push|replace)|redirect)\(\s*[`'\"]([^`'\"]+)[`'\"]"),
    ]
    user_attr = re.compile(r"(?:placeholder|aria-label|title|alt)\s*=\s*['\"]([^'\"]{2,})['\"]")
    jsx_text = re.compile(r">\s*([A-Za-z][^<{\n]{2,80})\s*<")
    key_pattern = re.compile(r"(?<![A-Za-z0-9_$])(?:t|i18n\.t)\(\s*['\"]([^'\"]+)['\"]")
    marker_pattern = re.compile(r"TODO|FIXME|coming soon|not implemented|href=.?['\"]#|placeholder|as any|<any>|console\.log\(", re.I)

    for path, text in sources:
        rel = str(path.relative_to(ROOT))
        for pattern in link_patterns:
            for match in pattern.finditer(text):
                value = match.group(1)
                if is_internal(value):
                    links.append((rel, line_number(text, match.start()), value))
        for match in user_attr.finditer(text):
            value = match.group(1)
            if not value.startswith("/") and not value.startswith("http") and not re.search(r"\{\{|\$\{", value):
                hardcoded.append((rel, line_number(text, match.start()), value))
        for match in jsx_text.finditer(text):
            value = re.sub(r"\s+", " ", match.group(1)).strip()
            if value and not value.startswith("{") and not value.startswith("/"):
                hardcoded.append((rel, line_number(text, match.start()), value))
        for match in key_pattern.finditer(text):
            translation_keys.add(match.group(1))
            key_usage.append((rel, line_number(text, match.start()), match.group(1)))
        for match in marker_pattern.finditer(text):
            markers.append((rel, line_number(text, match.start()), match.group(0)))

    unresolved = []
    for rel, line, candidate in links:
        normalized = normalize_candidate(candidate)
        if normalized.startswith("/api/") or normalized in {"/sitemap.xml", "/robots.txt"} or normalized.rsplit('/', 1)[-1].lower() in {"logo.svg", "favicon.ico"}:
            continue
        if not any(pattern.match(normalized) for _, pattern in route_patterns):
            unresolved.append((rel, line, candidate))

    locale_paths = [ROOT / "locales" / "en" / "common.json", ROOT / "locales" / "fr" / "common.json"]
    locale_maps = {}
    for path in locale_paths:
        locale_maps[path.parent.name] = json.loads(path.read_text()) if path.exists() else {}
    def has_key(obj, key):
        if key in obj:
            return True
        return any(isinstance(value, dict) and has_key(value, key) for value in obj.values())
    missing_en = sorted(k for k in translation_keys if not has_key(locale_maps.get("en", {}), k))
    missing_fr = sorted(k for k in translation_keys if not has_key(locale_maps.get("fr", {}), k))

    report = []
    report.append("# Application-wide audit\n")
    report.append(f"Active page routes: {len(page_routes)}\n")
    report.append("## Active routes\n\n" + "\n".join(f"- `{r}`" for r in page_routes) + "\n")
    report.append(f"## Unresolved internal links ({len(unresolved)})\n")
    report.extend(f"- `{f}:{line}` -> `{value}`" for f, line, value in unresolved)
    report.append("\n## Hardcoded user-facing candidates\n")
    report.extend(f"- `{f}:{line}`: {value}" for f, line, value in hardcoded)
    report.append(f"\n## Translation key usage ({len(translation_keys)} unique keys)\n")
    report.append("Missing English keys: " + (", ".join(f"`{k}`" for k in missing_en) or "none"))
    report.append("Missing French keys: " + (", ".join(f"`{k}`" for k in missing_fr) or "none"))
    report.append("\n## Correctness-risk markers\n")
    report.extend(f"- `{f}:{line}`: `{value}`" for f, line, value in markers)
    output = ROOT / "zDocs" / "APP_WIDE_AUDIT.md"
    output.write_text("\n".join(report) + "\n")
    print(f"routes={len(page_routes)} unresolved_links={len(unresolved)} hardcoded_candidates={len(hardcoded)} translation_keys={len(translation_keys)} missing_en={len(missing_en)} missing_fr={len(missing_fr)} markers={len(markers)}")
    print(output)


if __name__ == "__main__":
    main()
