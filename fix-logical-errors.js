#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing logical comparison errors...');

function fixLogicalErrorsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix !variable === 'value' patterns (should be variable !== 'value')
    const logicalErrorRegex = /if \(!(\w+) === '([^']+)'\)/g;
    const matches = content.match(logicalErrorRegex);
    if (matches) {
      content = content.replace(logicalErrorRegex, "if ($1 !== '$2')");
      modified = true;
      console.log(`  ✅ Fixed logical comparison errors in ${path.basename(filePath)}`);
    }

    // Fix similar patterns with double quotes
    const logicalErrorRegex2 = /if \(!(\w+) === "([^"]+)"\)/g;
    const matches2 = content.match(logicalErrorRegex2);
    if (matches2) {
      content = content.replace(logicalErrorRegex2, 'if ($1 !== "$2")');
      modified = true;
      console.log(`  ✅ Fixed logical comparison errors (double quotes) in ${path.basename(filePath)}`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);
  let totalFixed = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      totalFixed += walkDirectory(filePath);
    } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
      if (fixLogicalErrorsInFile(filePath)) {
        totalFixed++;
      }
    }
  });

  return totalFixed;
}

// Start fixing from the API directory
const apiDir = path.join(__dirname, 'app', 'api');
if (fs.existsSync(apiDir)) {
  console.log(`📁 Processing API directory: ${apiDir}`);
  const fixedFiles = walkDirectory(apiDir);
  console.log(`\n✅ Fixed ${fixedFiles} files with logical errors`);
} else {
  console.error('❌ API directory not found');
}

console.log('🎉 Logical error fixes completed!');
