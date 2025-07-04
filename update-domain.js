#!/usr/bin/env node

/**
 * Domain Update Script for ViralReach
 * Run this script to update all domain references in your project
 * Usage: node update-domain.js https://yourdomain.com
 */

const fs = require('fs');
const path = require('path');

const OLD_DOMAIN = 'https://viralreach.com';
const NEW_DOMAIN = process.argv[2];

if (!NEW_DOMAIN) {
  console.error('❌ Please provide your new domain:');
  console.log('📝 Usage: node update-domain.js https://yourdomain.com');
  process.exit(1);
}

console.log(`🔄 Updating domain from ${OLD_DOMAIN} to ${NEW_DOMAIN}`);

// Files to update
const filesToUpdate = [
  'public/sitemap.xml',
  'public/robots.txt',
  'app/layout.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(new RegExp(OLD_DOMAIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), NEW_DOMAIN);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${file}`);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log('');
console.log('🎉 Domain update complete!');
console.log('📌 Next steps:');
console.log('1. Deploy your updated site');
console.log('2. Submit your sitemap to Google Search Console');
console.log('3. Request indexing for your main pages'); 