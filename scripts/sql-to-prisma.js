const fs = require('fs');
const path = require('path');
const readline = require('readline');

const inputFile = path.join(__dirname, '../dump/init.sql');
const outputFile = path.join(__dirname, '../prisma/schema.prisma');

// Type mapping from SQL to Prisma
const TYPE_MAPPING = {
    'int': 'Int',
    'smallint': 'Int',
    'tinyint': 'Boolean', // usually tinyint(1) is boolean
    'varchar': 'String',
    'char': 'String',
    'text': 'String',
    'longtext': 'String',
    'double': 'Float',
    'float': 'Float',
    'decimal': 'Decimal',
    'date': 'DateTime',
    'datetime': 'DateTime',
    'timestamp': 'DateTime',
    'json': 'Json',
    'bigint': 'BigInt'
};

function toPascalCase(str) {
    return str.replace(/_(\w)/g, (match, p1) => p1.toUpperCase()).replace(/^\w/, c => c.toUpperCase());
}

function toCamelCase(str) {
    return str.replace(/_(\w)/g, (match, p1) => p1.toUpperCase());
}

async function processFile() {
    const fileStream = fs.createReadStream(inputFile);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const tables = [];
    let currentTable = null;
    let insideCreateTable = false;

    for await (const line of rl) {
        const trimmedLine = line.trim();
        
        if (!insideCreateTable) {
            const createMatch = trimmedLine.match(/CREATE TABLE `(\w+)` \(/);
            if (createMatch) {
                insideCreateTable = true;
                currentTable = {
                    name: createMatch[1],
                    modelName: toPascalCase(createMatch[1]),
                    columns: [],
                    primaryKey: null,
                    indices: [],
                    lines: [], // Store lines for processing later or process on the fly
                    backRelations: [] // Store back relations to be added
                };
            }
        } else {
            if (trimmedLine.startsWith(') ENGINE=')) {
                insideCreateTable = false;
                processTableLines(currentTable);
                tables.push(currentTable);
                currentTable = null;
            } else {
                currentTable.lines.push(trimmedLine);
            }
        }
    }

    // Post-process to add back relations
    processBackRelations(tables);

    const prismaSchema = generatePrismaSchema(tables);
    fs.writeFileSync(outputFile, prismaSchema);
    console.log(`Generated Prisma schema with ${tables.length} models at ${outputFile}`);
}

function processTableLines(table) {
    table.lines.forEach(line => {
        if (line.startsWith('PRIMARY KEY')) {
            const pkMatch = line.match(/PRIMARY KEY \(`(.*?)`\)/);
            if (pkMatch) {
                table.primaryKey = pkMatch[1].split('`,`');
            }
        } else if (line.startsWith('UNIQUE KEY')) {
            const uniqueMatch = line.match(/UNIQUE KEY `.*?` \(`(.*?)`\)/);
            if (uniqueMatch) {
                table.indices.push({ type: 'unique', columns: uniqueMatch[1].split('`,`') });
            }
        } else if (line.startsWith('KEY')) {
            const keyMatch = line.match(/KEY `.*?` \(`(.*?)`\)/);
            if (keyMatch) {
                table.indices.push({ type: 'index', columns: keyMatch[1].split('`,`') });
            }
        } else if (line.startsWith('CONSTRAINT')) {
            // Foreign keys
            const fkMatch = line.match(/CONSTRAINT `.*?` FOREIGN KEY \(`(.*?)`\) REFERENCES `(.*?)` \(`(.*?)`\)/);
            if (fkMatch) {
                const col = fkMatch[1];
                const refTable = fkMatch[2];
                const refCol = fkMatch[3];
                // Store relation info to be added to column later
                const colObj = table.columns.find(c => c.name === col);
                if (colObj) {
                    colObj.relation = { table: refTable, col: refCol };
                }
            }
        } else if (line.startsWith('`')) {
            // Column definition
            const colMatch = line.match(/`(\w+)` (\w+)(?:\((.*?)\))?(.*)/);
            if (colMatch) {
                const name = colMatch[1];
                const typeStr = colMatch[2];
                const args = colMatch[3]; // e.g., 11 or 255
                const rest = colMatch[4];
                
                let type = TYPE_MAPPING[typeStr] || 'String';
                if (typeStr === 'tinyint' && args === '1') type = 'Boolean';
                
                const isNullable = !rest.includes('NOT NULL');
                const isAutoIncrement = rest.includes('AUTO_INCREMENT');
                
                table.columns.push({
                    name,
                    type,
                    isNullable,
                    isAutoIncrement,
                    originalType: typeStr
                });
            }
        }
    });
}

function processBackRelations(tables) {
    tables.forEach(table => {
        table.columns.forEach(col => {
            if (col.relation) {
                const refTable = tables.find(t => t.name === col.relation.table);
                if (refTable) {
                    const relationAttributeName = `${table.modelName}_${toCamelCase(col.name)}`;
                    col.relationName = relationAttributeName; // Store for generation

                    // Determine if relation is 1:1 or 1:N
                    // Check if the FK column is unique
                    const isUnique = table.indices.some(idx => 
                        idx.type === 'unique' && 
                        idx.columns.length === 1 && 
                        idx.columns[0] === col.name
                    );

                    // Back relation field name on the referenced table
                    // Default to current table name (camelCase)
                    // If conflict, append column name
                    let backFieldName = toCamelCase(table.name);
                    
                    // Check for conflicts in refTable columns or existing backRelations
                    // AND conflicts with forward relation fields on refTable
                    let suffix = 1;
                    const originalBackFieldName = backFieldName;
                    const backFieldNameWithCol = `${originalBackFieldName}_${toCamelCase(col.name)}`;

                    const isConflict = (name) => {
                        if (refTable.columns.some(c => toCamelCase(c.name) === name)) return true;
                        if (refTable.backRelations.some(r => r.name === name)) return true;
                        if (refTable.columns.some(c => {
                            if (!c.relation) return false;
                            const relName = toCamelCase(c.name.replace(/_id$/, ''));
                            const finalRelName = relName === toCamelCase(c.name) ? relName + 'Rel' : relName;
                            return finalRelName === name;
                        })) return true;
                        return false;
                    };

                    if (isConflict(backFieldName)) {
                         // Try adding column name
                         backFieldName = backFieldNameWithCol;
                         
                         while (isConflict(backFieldName)) {
                             // If still conflict, append number to the one with column name
                             backFieldName = `${backFieldNameWithCol}${suffix++}`;
                         }
                    }

                    refTable.backRelations.push({
                        name: backFieldName,
                        type: table.modelName,
                        isList: !isUnique,
                        relationName: relationAttributeName
                    });
                }
            }
        });
    });
}

function generatePrismaSchema(tables) {
    let output = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
`;

    tables.forEach(table => {
        output += `\nmodel ${table.modelName} {\n`;

        // Regular columns
        table.columns.forEach(col => {
            let line = `  ${toCamelCase(col.name)} ${col.type}`;
            
            if (col.isNullable) line += '?';
            
            const attributes = [];
            
            if (table.primaryKey && table.primaryKey.length === 1 && table.primaryKey[0] === col.name) {
                attributes.push('@id');
                if (col.isAutoIncrement) attributes.push('@default(autoincrement())');
            }
            
            // Map column name if it differs from camelCase
            if (col.name !== toCamelCase(col.name)) {
                attributes.push(`@map("${col.name}")`);
            }
            
            // Unique constraints (single column)
            const uniqueIndex = table.indices.find(idx => idx.type === 'unique' && idx.columns.length === 1 && idx.columns[0] === col.name);
            if (uniqueIndex) {
                attributes.push('@unique');
            }

            if (attributes.length > 0) {
                line += ' ' + attributes.join(' ');
            }
            
            output += line + '\n';

            // Add relation field if exists
            if (col.relation) {
                const refTable = tables.find(t => t.name === col.relation.table);
                const refModelName = refTable ? refTable.modelName : toPascalCase(col.relation.table);
                // relation field name: e.g., user
                const relationName = toCamelCase(col.name.replace(/_id$/, ''));
                // avoid name collision with column
                const finalRelationName = relationName === toCamelCase(col.name) ? relationName + 'Rel' : relationName;
                
                output += `  ${finalRelationName} ${refModelName}? @relation("${col.relationName}", fields: [${toCamelCase(col.name)}], references: [${toCamelCase(col.relation.col)}])\n`;
            }
        });

        // Back relations
        table.backRelations.forEach(rel => {
            const type = rel.isList ? `${rel.type}[]` : `${rel.type}?`;
            output += `  ${rel.name} ${type} @relation("${rel.relationName}")\n`;
        });

        // Composite Primary Key
        if (table.primaryKey && table.primaryKey.length > 1) {
            output += `  @@id([${table.primaryKey.map(k => toCamelCase(k)).join(', ')}])\n`;
        }

        // Composite Unique Keys
        table.indices.filter(idx => idx.type === 'unique' && idx.columns.length > 1).forEach(idx => {
            output += `  @@unique([${idx.columns.map(c => toCamelCase(c)).join(', ')}])\n`;
        });
        
        // Indices (non-unique)
        table.indices.filter(idx => idx.type === 'index').forEach(idx => {
            output += `  @@index([${idx.columns.map(c => toCamelCase(c)).join(', ')}])\n`;
        });

        output += `  @@map("${table.name}")\n`;
        output += '}\n';
    });

    return output;
}

processFile().catch(console.error);
