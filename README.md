this is playwright based test automation framework 

Main feature of this framework:- 
1. centralized config loader
2. multi project architecture (multiple projects inside one playwright-root)
3. custom data injection (used mongo db with docker to inject test data)
4. tag based test filtering (tags @smoke, @regressions) can be found in test scripts
5. page object model based testing automation framework
6. 



first clone the project from main branch 

then run the below command to create a mongo db container - otherwise tests may fail as they pull test data from mongo db docker container
docker run -d 
--name playwright-mongo 
-p 27017:27017 
-v mongo-data:/data/db 
mongo:6.0

then run the below command to open shell inside new created container 
docker exec -it playwright-mongo mongosh

then run below command inside the newly created container's shell 
db.users.insertone({
name:'JIRA-123',
env:'qa',
firstname:'test user',
email: 'test@example.com',
currentAddress: '123 Test St, Test City',
permenantAddress: '456 Example Ave, Example City'
})

this will insert a document inside the mongo db in docker container.
NOTE: in real world scenario we will use mongodb cloud hosted instance instead of docker setup.

change the tag-name and project name as per the test you want to run
then run the test with "npx playwright test -g @textbox --project demo_qa" 

or if you want to run all the tests inside a project use command "npx playwright test --project demo_qa"


