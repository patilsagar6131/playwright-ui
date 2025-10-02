import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
const env = process.env.ENV || 'qa';
function loadEnv(projectFolder : string){
console.info("Running test in " + env + " environment");

dotenv.config({  
  path: path.resolve(__dirname, projectFolder, `.env.${env}`)
});
return {
  baseURL: process.env.URL!,
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!,

};
}

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  
  fullyParallel: true,
 
  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',
  
  use: {   
    trace: 'on-first-retry',
    headless: false,
    viewport: null,
    navigationTimeout: 60000,
    launchOptions: {
      args:['--start-maximized ']
    }   
  },

 
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },      
    },
    {
      name: 'demo_qa',
      testDir:'project_demo_qa/tests',
      use: loadEnv('project_demo_qa')         
    }  
  ],

 
});
