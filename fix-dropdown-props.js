#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing DropdownMenuItem inset prop issues...');

function fixDropdownPropsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix DropdownMenuItem without inset prop
    const dropdownItemRegex = /<DropdownMenuItem([^>]*?)className="([^"]*?)"([^>]*?)>/g;
    const matches = [...content.matchAll(dropdownItemRegex)];
    
    for (const match of matches) {
      const fullMatch = match[0];
      const beforeClassName = match[1];
      const classNameValue = match[2];
      const afterClassName = match[3];
      
      // Check if inset prop is already present
      if (!fullMatch.includes('inset=')) {
        const replacement = `<DropdownMenuItem${beforeClassName}className="${classNameValue}" inset={false}${afterClassName}>`;
        content = content.replace(fullMatch, replacement);
        modified = true;
      }
    }

    // Also handle cases where className comes after other props
    const dropdownItemRegex2 = /<DropdownMenuItem([^>]*?)>/g;
    content = content.replace(dropdownItemRegex2, (match, props) => {
      if (props.includes('className') && !props.includes('inset=')) {
        return `<DropdownMenuItem${props} inset={false}>`;
      }
      return match;
    });

    if (content !== fs.readFileSync(filePath, 'utf8')) {
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`  ✅ Fixed DropdownMenuItem props in ${path.basename(filePath)}`);
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
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (fixDropdownPropsInFile(filePath)) {
        totalFixed++;
      }
    }
  });

  return totalFixed;
}

// Start fixing from the components directory
const componentsDir = path.join(__dirname, 'components');
if (fs.existsSync(componentsDir)) {
  console.log(`📁 Processing components directory: ${componentsDir}`);
  const fixedFiles = walkDirectory(componentsDir);
  console.log(`\n✅ Fixed ${fixedFiles} files with DropdownMenuItem prop issues`);
} else {
  console.error('❌ Components directory not found');
}

console.log('🎉 DropdownMenuItem prop fixes completed!');
