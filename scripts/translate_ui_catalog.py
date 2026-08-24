from __future__ import annotations

import json
import re
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from openai import OpenAI

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'zDocs' / 'APP_WIDE_AUDIT.md'
OUTPUT = ROOT / 'locales' / 'fr' / 'runtime.json'


def candidates() -> list[str]:
    values: set[str] = set()
    in_section = False
    for line in REPORT.read_text(errors='ignore').splitlines():
        if line.startswith('## Hardcoded user-facing candidates'):
            in_section = True
            continue
        if line.startswith('## Translation key usage'):
            break
        if not in_section or not line.startswith('- `') or ': ' not in line:
            continue
        value = line.split(': ', 1)[1].strip()
        value = re.sub(r'^`|`$', '', value)
        value = re.sub(r'&(?:apos|quot);', "'", value)
        if not (2 <= len(value) <= 120 and re.search(r'[A-Za-zÀ-ÿ]', value)):
            continue
        if any(token in value for token in ['=>', '${', 'event.target', 'className=', 'setName(', 'setEmail(', 'setMessage(', 'map((', 'index +', 'data-', 'href=', 'src=', 'type=', 'id=', 'value=', 'onChange=', 'onClick=', 'font-', 'bi bi-', 'fas fa-', 'fab fa-', 'placeholder', '********']):
            continue
        if value.lower() in {'avatar', 'breadcrumb', 'navigation', 'placeholder', 'instructor', 's', 't', 'free', 'paid'}:
            continue
        values.add(value)
    return sorted(values)


def translate_batch(items: list[str]) -> dict[str, str]:
    client = OpenAI()
    prompt = {
        'task': 'Translate each UI string from English to natural, concise French for a bilingual education platform in Cameroon.',
        'rules': [
            'Return exactly one translation per input string in the same order.',
            'Preserve interpolation tokens, punctuation, HTML entities, and placeholders.',
            'Do not translate proper names, product names, CSS classes, or technical identifiers.',
            'Use standard French UI phrasing and avoid literal awkward translations.',
        ],
        'items': items,
    }
    response = client.chat.completions.create(
        model='gpt-5-mini',
        messages=[
            {'role': 'system', 'content': 'You are a precise software localization translator. Output JSON only.'},
            {'role': 'user', 'content': json.dumps(prompt, ensure_ascii=False)},
        ],
        response_format={
            'type': 'json_schema',
            'json_schema': {
                'name': 'translations',
                'strict': True,
                'schema': {
                    'type': 'object',
                    'properties': {'translations': {'type': 'array', 'items': {'type': 'string'}}},
                    'required': ['translations'],
                    'additionalProperties': False,
                },
            },
        },
        max_completion_tokens=5000,
    )
    data = json.loads(response.choices[0].message.content)
    translations = data['translations']
    if len(translations) != len(items):
        raise ValueError(f'Expected {len(items)} translations, got {len(translations)}')
    return dict(zip(items, translations))


def main() -> None:
    items = candidates()
    batches = [items[i:i + 40] for i in range(0, len(items), 40)]
    merged: dict[str, str] = {}
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(translate_batch, batch) for batch in batches]
        for future in as_completed(futures):
            merged.update(future.result())
    OUTPUT.write_text(json.dumps(dict(sorted(merged.items())), ensure_ascii=False, indent=2) + '\n')
    print(f'translated={len(merged)} batches={len(batches)} output={OUTPUT}')


if __name__ == '__main__':
    main()
