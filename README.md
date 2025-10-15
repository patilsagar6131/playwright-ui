this is playwright based test automation framework 

Main feature of this framework:- 
1. centralized config loader
2. multi project architecture (multiple projects inside one playwright-root)
3. custom data injection (used mongo db with docker to inject test data)
4. tag based test filtering (tags @smoke, @regressions) can be found in test scripts
5. page object model based testing automation framework
6. 







change the tag-name and project name as per the test you want to run
then run the test with "npx playwright test -g @textbox --project demo_qa" 

or if you want to run all the tests inside a project use command "npx playwright test --project demo_qa"

Please run the hashicorp vault before running this project and copy paste your secret key value inside "project/env" path and copy paste your token in env.qa file as "VAULT_TOKEN"

