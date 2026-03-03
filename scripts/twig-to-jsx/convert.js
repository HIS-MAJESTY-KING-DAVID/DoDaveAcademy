const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, '../../templates');
const OUTPUT_DIR = path.join(__dirname, '../../To_React_TSX/components/generated');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function convertTwigToJsx(content) {
    let jsx = content;

    // 1. Convert comments: {# comment #} -> {/* comment */}
    jsx = jsx.replace(/\{#\s*(.*?)\s*#\}/g, '{/* $1 */}');

    // 2. Convert variable output: {{ var }} -> {var}
    jsx = jsx.replace(/\{\{\s*(.*?)\s*\}\}/g, '{$1}');

    // 3. Convert class attribute: class="..." -> className="..."
    jsx = jsx.replace(/\bclass="/g, 'className="');

    // 4. Convert loops (naive): {% for item in items %} -> {items.map(item => (
    jsx = jsx.replace(/\{%\s*for\s+(\w+)\s+in\s+(\w+)\s*%\}/g, '{$2.map($1 => (\n');
    jsx = jsx.replace(/\{%\s*endfor\s*%\}/g, '\n))}');

    // 5. Convert conditionals (naive): {% if var %} -> {var && (
    jsx = jsx.replace(/\{%\s*if\s+(.*?)\s*%\}/g, '{$1 && (\n');
    jsx = jsx.replace(/\{%\s*endif\s*%\}/g, '\n)}');
    jsx = jsx.replace(/\{%\s*else\s*%\}/g, '\n) || (\n');

    // 6. Convert links: <a href="{{ path('route') }}"> -> <Link href="/route">
    // This is very rough and assumes path() helper needs replacement
    jsx = jsx.replace(/href="\{\{\s*path\(['"](\w+)['"]\)\s*\}\}"/g, 'href="/$1"');

    // 7. Self-closing tags fix (img, input, br, hr)
    jsx = jsx.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');

    // 8. Style attribute: style="color: red;" -> style={{color: 'red'}} (Complex, skipping for now or doing simple replacement)
    // jsx = jsx.replace(/style="([^"]*)"/g, 'style={{$1}}'); // This often breaks, safer to leave as string and fix manually

    return jsx;
}

function generateReactComponent(fileName, content) {
    const componentName = fileName.replace('.html.twig', '')
        .split(/[-_]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    const jsxContent = convertTwigToJsx(content);

    return `import React from 'react';
import Link from 'next/link';

export default function ${componentName}(props: any) {
  return (
    <>
${jsxContent}
    </>
  );
}
`;
}

function processDirectory(dir, outputSubDir = '') {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const newSubDir = path.join(outputSubDir, file);
            const newOutputDir = path.join(OUTPUT_DIR, newSubDir);
            if (!fs.existsSync(newOutputDir)) {
                fs.mkdirSync(newOutputDir, { recursive: true });
            }
            processDirectory(fullPath, newSubDir);
        } else if (file.endsWith('.twig')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const componentContent = generateReactComponent(file, content);
            
            // Rename file: index.html.twig -> Index.tsx
            const componentName = file.replace('.html.twig', '')
                .split(/[-_]/)
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join('');
            
            const outputFile = path.join(OUTPUT_DIR, outputSubDir, `${componentName}.tsx`);
            fs.writeFileSync(outputFile, componentContent);
            console.log(`Generated: ${outputFile}`);
        }
    });
}

console.log('Starting Twig to JSX conversion...');
processDirectory(TEMPLATE_DIR);
console.log('Conversion complete!');
