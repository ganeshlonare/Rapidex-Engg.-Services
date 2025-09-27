#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing component prop issues...');

function fixComponentPropsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix SidebarMenuItem without className
    if (content.includes('<SidebarMenuItem>')) {
      content = content.replace(/<SidebarMenuItem>/g, '<SidebarMenuItem className="">');
      modified = true;
      console.log(`  ✅ Fixed SidebarMenuItem props in ${path.basename(filePath)}`);
    }

    // Fix SidebarMenuButton without tooltip
    const sidebarMenuButtonRegex = /<SidebarMenuButton([^>]*?)className="([^"]*?)"([^>]*?)>/g;
    if (content.match(sidebarMenuButtonRegex)) {
      content = content.replace(sidebarMenuButtonRegex, '<SidebarMenuButton$1className="$2" tooltip=""$3>');
      modified = true;
      console.log(`  ✅ Fixed SidebarMenuButton tooltip in ${path.basename(filePath)}`);
    }

    // Fix CollapsibleContent without className
    if (content.includes('<CollapsibleContent>')) {
      content = content.replace(/<CollapsibleContent>/g, '<CollapsibleContent className="">');
      modified = true;
      console.log(`  ✅ Fixed CollapsibleContent props in ${path.basename(filePath)}`);
    }

    // Fix SidebarMenuSub without className
    if (content.includes('<SidebarMenuSub>')) {
      content = content.replace(/<SidebarMenuSub>/g, '<SidebarMenuSub className="">');
      modified = true;
      console.log(`  ✅ Fixed SidebarMenuSub props in ${path.basename(filePath)}`);
    }

    // Fix SidebarMenuSubItem without className
    if (content.includes('<SidebarMenuSubItem')) {
      content = content.replace(/<SidebarMenuSubItem([^>]*?)>/g, (match, attrs) => {
        if (!attrs.includes('className')) {
          return `<SidebarMenuSubItem${attrs} className="">`;
        }
        return match;
      });
      modified = true;
      console.log(`  ✅ Fixed SidebarMenuSubItem props in ${path.basename(filePath)}`);
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
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (fixComponentPropsInFile(filePath)) {
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
  console.log(`\n✅ Fixed ${fixedFiles} files with component prop issues`);
} else {
  console.error('❌ Components directory not found');
}

console.log('🎉 Component prop fixes completed!');
