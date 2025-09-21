#!/usr/bin/env node

console.log('🔍 Checking Environment Variables for Metadata...\n');

const requiredEnvVars = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_BASE_URL',
    'NEXT_PUBLIC_API_BASE_URL'
];

const optionalEnvVars = [
    'GOOGLE_SITE_VERIFICATION',
    'GOOGLE_ANALYTICS_ID',
    'GOOGLE_TAG_MANAGER_ID',
    'FACEBOOK_PIXEL_ID'
];

console.log('📋 Required Environment Variables:');
console.log('=====================================');

let hasIssues = false;

requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        console.log(`✅ ${varName}: ${value}`);
        
        // Check if it's localhost (problematic for social media)
        if (value.includes('localhost') || value.includes('127.0.0.1')) {
            console.log(`   ⚠️  WARNING: ${varName} uses localhost - social media won't work!`);
            hasIssues = true;
        }
    } else {
        console.log(`❌ ${varName}: NOT SET`);
        hasIssues = true;
    }
});

console.log('\n📋 Optional Environment Variables:');
console.log('===================================');

optionalEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        console.log(`✅ ${varName}: ${value}`);
    } else {
        console.log(`⚪ ${varName}: Not set (optional)`);
    }
});

console.log('\n🎯 Metadata Status:');
console.log('==================');

if (hasIssues) {
    console.log('❌ Issues found! Your metadata may not work properly on social media.');
    console.log('\n🔧 To fix:');
    console.log('1. Update your .env file with your actual domain:');
    console.log('   NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com');
    console.log('2. Restart your development server: npm run dev');
    console.log('3. Test again with: npm run check-env');
} else {
    console.log('✅ Environment looks good for metadata!');
}

console.log('\n🧪 Testing Steps:');
console.log('1. Visit: http://localhost:3000/test-metadata');
console.log('2. View page source and check for meta tags');
console.log('3. Test with social media debuggers:');
console.log('   - Facebook: https://developers.facebook.com/tools/debug/');
console.log('   - Twitter: https://cards-dev.twitter.com/validator');
console.log('   - LinkedIn: https://www.linkedin.com/post-inspector/');
