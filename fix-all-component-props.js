#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Final comprehensive fix for all component props...');

function fixAllComponentPropsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // List of components that need className prop
    const componentsNeedingClassName = [
      'AccordionItem', 'AccordionTrigger', 'AccordionContent',
      'Checkbox', 'Slider', 'Avatar', 'AvatarImage', 'Badge',
      'Command', 'CommandList', 'CommandInput', 'CommandEmpty', 'CommandGroup', 'CommandItem',
      'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription',
      'SheetDescription', 'Tooltip', 'TooltipContent', 'TooltipTrigger',
      'Popover', 'PopoverContent', 'PopoverTrigger',
      'Select', 'SelectContent', 'SelectItem', 'SelectTrigger', 'SelectValue',
      'Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'
    ];

    // Fix components without className
    componentsNeedingClassName.forEach(componentName => {
      // Pattern: <ComponentName ...props>
      const regex1 = new RegExp(`<${componentName}([^>]*?)>`, 'g');
      content = content.replace(regex1, (match, props) => {
        if (!props.includes('className')) {
          const newProps = props.trim() ? `${props} className=""` : ` className=""`;
          modified = true;
          return `<${componentName}${newProps}>`;
        }
        return match;
      });

      // Pattern: <ComponentName ...props />
      const regex2 = new RegExp(`<${componentName}([^>]*?)\\s*/>`, 'g');
      content = content.replace(regex2, (match, props) => {
        if (!props.includes('className')) {
          const newProps = props.trim() ? `${props} className=""` : ` className=""`;
          modified = true;
          return `<${componentName}${newProps} />`;
        }
        return match;
      });
    });

    // Fix DropdownMenuItem without inset prop
    const dropdownItemRegex = /<DropdownMenuItem([^>]*?)>/g;
    content = content.replace(dropdownItemRegex, (match, props) => {
      let newProps = props;
      let needsUpdate = false;
      
      if (!props.includes('className')) {
        newProps += ' className=""';
        needsUpdate = true;
      }
      if (!props.includes('inset')) {
        newProps += ' inset={false}';
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        modified = true;
        return `<DropdownMenuItem${newProps}>`;
      }
      return match;
    });

    // Fix DropdownMenuContent without className
    const dropdownContentRegex = /<DropdownMenuContent([^>]*?)>/g;
    content = content.replace(dropdownContentRegex, (match, props) => {
      if (!props.includes('className')) {
        const newProps = props.trim() ? `${props} className=""` : ` className=""`;
        modified = true;
        return `<DropdownMenuContent${newProps}>`;
      }
      return match;
    });

    // Fix Badge without variant prop
    const badgeRegex = /<Badge([^>]*?)>/g;
    content = content.replace(badgeRegex, (match, props) => {
      let newProps = props;
      let needsUpdate = false;
      
      if (!props.includes('className')) {
        newProps += ' className=""';
        needsUpdate = true;
      }
      if (!props.includes('variant')) {
        newProps += ' variant="default"';
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        modified = true;
        return `<Badge${newProps}>`;
      }
      return match;
    });

    // Fix Slider without required props
    const sliderRegex = /<Slider([^>]*?)>/g;
    content = content.replace(sliderRegex, (match, props) => {
      let newProps = props;
      let needsUpdate = false;
      
      if (!props.includes('className')) {
        newProps += ' className=""';
        needsUpdate = true;
      }
      if (!props.includes('value=')) {
        newProps += ' value={[0]}';
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        modified = true;
        return `<Slider${newProps}>`;
      }
      return match;
    });

    // Fix InputOTP without containerClassName
    const inputOTPRegex = /<InputOTP([^>]*?)>/g;
    content = content.replace(inputOTPRegex, (match, props) => {
      let newProps = props;
      let needsUpdate = false;
      
      if (!props.includes('className')) {
        newProps += ' className=""';
        needsUpdate = true;
      }
      if (!props.includes('containerClassName')) {
        newProps += ' containerClassName=""';
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        modified = true;
        return `<InputOTP${newProps}>`;
      }
      return match;
    });

    // Fix SidebarMenuButton without tooltip
    const sidebarMenuButtonRegex = /<SidebarMenuButton([^>]*?)>/g;
    content = content.replace(sidebarMenuButtonRegex, (match, props) => {
      if (!props.includes('tooltip')) {
        const newProps = props.trim() ? `${props} tooltip=""` : ` tooltip=""`;
        modified = true;
        return `<SidebarMenuButton${newProps}>`;
      }
      return match;
    });

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`  ✅ Fixed component props in ${path.basename(filePath)}`);
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
    } else if ((file.endsWith('.tsx') || file.endsWith('.ts')) && !file.endsWith('.d.ts')) {
      if (fixAllComponentPropsInFile(filePath)) {
        totalFixed++;
      }
    }
  });

  return totalFixed;
}

// Start fixing from multiple directories
const directories = ['components', 'app'];
let totalFixedFiles = 0;

directories.forEach(dirName => {
  const dir = path.join(__dirname, dirName);
  if (fs.existsSync(dir)) {
    console.log(`📁 Processing ${dirName} directory: ${dir}`);
    const fixedFiles = walkDirectory(dir);
    totalFixedFiles += fixedFiles;
    console.log(`✅ Fixed ${fixedFiles} files in ${dirName}`);
  }
});

console.log(`\n🎉 Final comprehensive fix completed! Fixed ${totalFixedFiles} files total.`);
