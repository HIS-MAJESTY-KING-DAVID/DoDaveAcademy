const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const translationsDir = path.join(__dirname, '../../translations');
const outputDir = path.join(__dirname, '../locales');

const files = [
  { input: 'messages.en.yml', output: 'en/common.json' },
  { input: 'messages.fr.yml', output: 'fr/common.json' },
];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

files.forEach(file => {
  const inputPath = path.join(translationsDir, file.input);
  const outputPath = path.join(outputDir, file.output);
  const outputDirForFile = path.dirname(outputPath);

  if (!fs.existsSync(outputDirForFile)) {
    fs.mkdirSync(outputDirForFile, { recursive: true });
  }

  try {
    const fileContents = fs.readFileSync(inputPath, 'utf8');
    const data = yaml.load(fileContents);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`Converted ${file.input} to ${file.output}`);
  } catch (e) {
    console.error(`Error converting ${file.input}:`, e);
  }
});
