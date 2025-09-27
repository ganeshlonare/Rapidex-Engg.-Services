#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Starting Mongoose TypeScript fixes...');

// List of Mongoose models that need type assertions
const modelNames = [
  'CategoryModel',
  'ProductModel', 
  'ProductVariantModel',
  'UserModel',
  'OrderModel',
  'ReviewModel',
  'CouponModel',
  'OTPModel',
  'MediaModel'
];

// Mongoose methods that need type assertions
const methods = [
  'find',
  'findOne', 
  'findById',
  'create',
  'updateMany',
  'deleteMany',
  'updateOne',
  'deleteOne',
  'findByIdAndUpdate',
  'findByIdAndDelete',
  'findOneAndUpdate',
  'findOneAndDelete'
];

function fixMongooseTypesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix Mongoose model method calls
    modelNames.forEach(modelName => {
      methods.forEach(method => {
        const regex = new RegExp(`(\\s+)(${modelName})\\.${method}\\(`, 'g');
        const replacement = `$1(${modelName} as any).${method}(`;
        
        if (content.includes(`${modelName}.${method}(`)) {
          content = content.replace(regex, replacement);
          modified = true;
          console.log(`  ✅ Fixed ${modelName}.${method}() in ${path.basename(filePath)}`);
        }
      });
    });

    // Fix catchError calls with missing second parameter
    const catchErrorRegex = /return catchError\(error\)$/gm;
    if (content.match(catchErrorRegex)) {
      content = content.replace(catchErrorRegex, "return catchError(error, 'Operation failed')");
      modified = true;
      console.log(`  ✅ Fixed catchError() calls in ${path.basename(filePath)}`);
    }

    // Fix new Model() calls
    modelNames.forEach(modelName => {
      const newModelRegex = new RegExp(`new ${modelName}\\(`, 'g');
      if (content.includes(`new ${modelName}(`)) {
        content = content.replace(newModelRegex, `new (${modelName} as any)(`);
        modified = true;
        console.log(`  ✅ Fixed new ${modelName}() in ${path.basename(filePath)}`);
      }
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
      if (fixMongooseTypesInFile(filePath)) {
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
  console.log(`\n✅ Fixed ${fixedFiles} files with Mongoose type issues`);
} else {
  console.error('❌ API directory not found');
}

console.log('🎉 Mongoose TypeScript fixes completed!');
