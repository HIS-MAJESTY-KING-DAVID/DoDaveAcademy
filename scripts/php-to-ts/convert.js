const fs = require('fs');
const path = require('path');

const ENTITY_DIR = path.join(__dirname, '../../src/Entity');
const OUTPUT_DIR = path.join(__dirname, '../../To_React_TSX/interfaces');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Map PHP types to TypeScript types
const TYPE_MAPPING = {
    'int': 'number',
    'float': 'number',
    'string': 'string',
    'bool': 'boolean',
    'array': 'any[]',
    'DateTime': 'Date',
    'DateTimeImmutable': 'Date',
    'Collection': 'any[]', // Default for Doctrine Collections
    'null': 'null'
};

function parsePhpFile(content) {
    const lines = content.split('\n');
    let className = '';
    const properties = [];

    lines.forEach(line => {
        // Extract class name
        const classMatch = line.match(/class\s+(\w+)/);
        if (classMatch) {
            className = classMatch[1];
        }

        // Extract properties (naive regex approach)
        // Matches: private ?string $name = null;
        // Matches: private int $id;
        const propMatch = line.match(/private\s+(\??)([\w\\]+)\s+\$(\w+)/);
        if (propMatch) {
            const isNullable = propMatch[1] === '?';
            let phpType = propMatch[2];
            const propName = propMatch[3];

            // Clean namespace from type
            if (phpType.includes('\\')) {
                const parts = phpType.split('\\');
                phpType = parts[parts.length - 1];
            }

            let tsType = TYPE_MAPPING[phpType] || phpType; // Fallback to class name if custom type
            
            if (tsType === 'Date') tsType = 'string'; // Dates are strings in JSON

            properties.push({
                name: propName,
                type: tsType,
                nullable: isNullable
            });
        }
    });

    return { className, properties };
}

function generateTsInterface(className, properties) {
    if (!className) return '';

    const props = properties.map(p => {
        const type = p.nullable ? `${p.type} | null` : p.type;
        return `  ${p.name}: ${type};`;
    }).join('\n');

    return `export interface ${className} {\n${props}\n}\n`;
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath); // Recursion
        } else if (file.endsWith('.php')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const { className, properties } = parsePhpFile(content);

            if (className) {
                const tsContent = generateTsInterface(className, properties);
                const outputFile = path.join(OUTPUT_DIR, `${className}.ts`);
                fs.writeFileSync(outputFile, tsContent);
                console.log(`Generated: ${outputFile}`);
            }
        }
    });
}

console.log('Starting conversion...');
processDirectory(ENTITY_DIR);
console.log('Conversion complete!');
