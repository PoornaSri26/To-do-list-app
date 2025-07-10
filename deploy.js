#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 To-Do List App Deployment Helper');
console.log('=====================================\n');

// Check if all required files exist
const requiredFiles = [
  'index.html',
  'package.json',
  'src/styles.css',
  'src/style.css',
  'src/To do list app/app.js',
  'src/To do list app/darkmode.js',
  'src/To do list app/manifest.json'
];

console.log('📋 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing. Please check the file structure.');
  process.exit(1);
}

console.log('\n✅ All required files found!');
console.log('\n🌐 Deployment Options:');
console.log('1. GitHub Pages (Free)');
console.log('2. Netlify (Free)');
console.log('3. Vercel (Free)');
console.log('4. Firebase Hosting (Free)');
console.log('5. Any static hosting service');

console.log('\n📝 Quick Deploy Instructions:');
console.log('============================');

console.log('\n🎯 Option 1: GitHub Pages (Recommended)');
console.log('1. Create a new repository on GitHub');
console.log('2. Run these commands:');
console.log('   git init');
console.log('   git add .');
console.log('   git commit -m "Initial commit"');
console.log('   git branch -M main');
console.log('   git remote add origin https://github.com/YOUR_USERNAME/todo-list-app.git');
console.log('   git push -u origin main');
console.log('3. Go to repository Settings > Pages');
console.log('4. Select "Deploy from a branch" > main');
console.log('5. Your app will be available at: https://YOUR_USERNAME.github.io/todo-list-app');

console.log('\n🎯 Option 2: Netlify (Easiest)');
console.log('1. Go to https://netlify.com');
console.log('2. Drag and drop your project folder');
console.log('3. Your app will be deployed instantly!');

console.log('\n🎯 Option 3: Vercel');
console.log('1. Install Vercel CLI: npm i -g vercel');
console.log('2. Run: vercel');
console.log('3. Follow the prompts');

console.log('\n🎯 Option 4: Firebase Hosting');
console.log('1. Install Firebase CLI: npm install -g firebase-tools');
console.log('2. Run: firebase login');
console.log('3. Run: firebase init hosting');
console.log('4. Run: firebase deploy');

console.log('\n📱 PWA Features Ready:');
console.log('✅ Installable as native app');
console.log('✅ Offline functionality');
console.log('✅ Dark mode support');
console.log('✅ Mobile responsive');
console.log('✅ No external dependencies');

console.log('\n🔧 Local Development:');
console.log('npm start - Start development server');
console.log('npm run dev - Start with CORS enabled');

console.log('\n✅ Your app is ready for deployment!');
console.log('Choose your preferred platform above and follow the instructions.');
console.log('\n🎉 Happy deploying! 🚀'); 