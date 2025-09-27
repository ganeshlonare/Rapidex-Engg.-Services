#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing filter type issues...');

function fixFilterTypesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix filter object declarations
    const filterRegex = /const filter = \{/g;
    if (content.includes('const filter = {')) {
      content = content.replace(filterRegex, 'const filter: any = {');
      modified = true;
      console.log(`  ✅ Fixed filter type in ${path.basename(filePath)}`);
    }

    // Fix filter._id assignments
    const filterIdRegex = /(\s+)filter\._id = /g;
    if (content.includes('filter._id = ')) {
      content = content.replace(filterIdRegex, '$1(filter as any)._id = ');
      modified = true;
      console.log(`  ✅ Fixed filter._id assignment in ${path.basename(filePath)}`);
    }

    // Fix other filter property assignments
    const filterPropRegex = /(\s+)filter\.(\w+) = /g;
    content = content.replace(filterPropRegex, (match, indent, prop) => {
      if (prop !== '_id') { // _id already handled above
        modified = true;
        console.log(`  ✅ Fixed filter.${prop} assignment in ${path.basename(filePath)}`);
        return `${indent}(filter as any).${prop} = `;
      }
      return match;
    });

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
      if (fixFilterTypesInFile(filePath)) {
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
  console.log(`\n✅ Fixed ${fixedFiles} files with filter type issues`);
} else {
  console.error('❌ API directory not found');
}

console.log('🎉 Filter type fixes completed!');
