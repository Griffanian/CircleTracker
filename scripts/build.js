#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building Circles web app...');
console.log('Step 1/2: Running expo export:web...');

const build = spawn('npx', ['expo', 'export:web'], {
  stdio: 'inherit',
  shell: true
});

build.on('close', (code) => {
  if (code === 0) {
    console.log('✓ Expo web export complete!');
    console.log('Step 2/2: Copying to deployment directory...');
    
    try {
      const distPath = path.join(process.cwd(), 'dist');
      const deployPath = path.join(process.cwd(), 'static-build');
      
      if (!fs.existsSync(distPath)) {
        console.error('✗ Error: dist/ directory not found after build');
        process.exit(1);
      }
      
      if (fs.existsSync(deployPath)) {
        fs.rmSync(deployPath, { recursive: true, force: true });
      }
      
      fs.cpSync(distPath, deployPath, { recursive: true });
      
      console.log('✓ Build complete!');
      console.log('  Deployment directory: static-build/');
      process.exit(0);
    } catch (error) {
      console.error('✗ Error copying build files:', error.message);
      process.exit(1);
    }
  } else {
    console.error('✗ Expo build failed with code:', code);
    process.exit(code);
  }
});

build.on('error', (error) => {
  console.error('✗ Build error:', error.message);
  process.exit(1);
});
