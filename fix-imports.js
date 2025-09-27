#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing import issues...');

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if file uses 'response' function but doesn't import it
    if (content.includes('return response(') && !content.includes('import { response') && !content.includes('import { catchError, response')) {
      // Find the catchError import line and add response to it
      if (content.includes('import { catchError }')) {
        content = content.replace(
          'import { catchError }',
          'import { catchError, response }'
        );
        modified = true;
        console.log(`  ✅ Added response import to ${path.basename(filePath)}`);
      } else if (content.includes('from "@/lib/helperFunction"')) {
        // If there's already an import from helperFunction, add response to it
        const helperImportRegex = /import { ([^}]+) } from "@\/lib\/helperFunction"/;
        const match = content.match(helperImportRegex);
        if (match && !match[1].includes('response')) {
          const newImports = match[1] + ', response';
          content = content.replace(helperImportRegex, `import { ${newImports} } from "@/lib/helperFunction"`);
          modified = true;
          console.log(`  ✅ Added response to existing import in ${path.basename(filePath)}`);
        }
      } else {
        // Add new import line
        const importIndex = content.indexOf('import');
        if (importIndex !== -1) {
          const lines = content.split('\n');
          let insertIndex = 0;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('import')) {
              insertIndex = i + 1;
            } else if (lines[i].trim() === '' && insertIndex > 0) {
              break;
            }
          }
          lines.splice(insertIndex, 0, 'import { response } from "@/lib/helperFunction"');
          content = lines.join('\n');
          modified = true;
          console.log(`  ✅ Added new response import to ${path.basename(filePath)}`);
        }
      }
    }

    // Check for other common missing imports
    if (content.includes('isValidObjectId(') && !content.includes('import { isValidObjectId')) {
      if (content.includes('from "@/lib/helperFunction"')) {
        const helperImportRegex = /import { ([^}]+) } from "@\/lib\/helperFunction"/;
        const match = content.match(helperImportRegex);
        if (match && !match[1].includes('isValidObjectId')) {
          const newImports = match[1] + ', isValidObjectId';
          content = content.replace(helperImportRegex, `import { ${newImports} } from "@/lib/helperFunction"`);
          modified = true;
          console.log(`  ✅ Added isValidObjectId import to ${path.basename(filePath)}`);
        }
      }
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
      if (fixImportsInFile(filePath)) {
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
  console.log(`\n✅ Fixed ${fixedFiles} files with import issues`);
} else {
  console.error('❌ API directory not found');
}

console.log('🎉 Import fixes completed!');
