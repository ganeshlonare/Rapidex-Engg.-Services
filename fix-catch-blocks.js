#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing catch blocks without error parameters...');

function fixCatchBlocksInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix catch blocks without error parameter that use 'error' inside
    const catchWithoutErrorRegex = /} catch \{\s*\n\s*return catchError\(error/g;
    if (content.match(catchWithoutErrorRegex)) {
      content = content.replace(catchWithoutErrorRegex, '} catch (error) {\n        return catchError(error');
      modified = true;
      console.log(`  ✅ Fixed catch block without error parameter in ${path.basename(filePath)}`);
    }

    // Fix other variations
    const catchWithoutErrorRegex2 = /} catch \{\s*[\s\S]*?catchError\(error/g;
    if (content.match(catchWithoutErrorRegex2)) {
      content = content.replace(/} catch \{/g, '} catch (error) {');
      modified = true;
      console.log(`  ✅ Fixed catch block variations in ${path.basename(filePath)}`);
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
      if (fixCatchBlocksInFile(filePath)) {
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
  console.log(`\n✅ Fixed ${fixedFiles} files with catch block issues`);
} else {
  console.error('❌ API directory not found');
}

console.log('🎉 Catch block fixes completed!');
