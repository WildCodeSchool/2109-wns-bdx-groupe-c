import getDatabaseConnection from '../database-connection'
import { userGenerator } from "../_mock_/userGenerator";
import { commentGenerator } from "../_mock_/commentGenerator";
import { projectGenerator } from "../_mock_/projectGenerator";
import { taskGenerator } from "../_mock_/taskGenerator";
import { exit } from "process";
import { roleGenerator } from "../_mock_/roleGenerator";
import { projectRoleGenerator } from "../_mock_/projectRoleGenerator";
import { userProjectGenerator } from "../_mock_/userProjectGenerator";
import { languageGenerator } from "../_mock_/languageGenerator";
import { userLanguageGenerator } from "../_mock_/userLanguageGenerator";
import { statusGenerator } from "../_mock_/statusGenerator";

const dataFixtures = async () => {
  console.log(' --------------    LAUNCHING DATA FIXTURES  ------------------')

  console.log(' --------------    STEP 1/11 : Connect to database  ------------------')
  if (!process.env.DATABASE_URL) {
    throw Error('DATABASE_URL must be set in environment.')
  }
  const connexion = await getDatabaseConnection(process.env.DATABASE_URL)
  console.log('Connected to database')

  const entities = connexion.entityMetadatas
  // eslint-disable-next-line no-restricted-syntax
  for (const entity of entities) {
    const repository = connexion.getRepository(entity.name)
    await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`)
  }
  console.log(' --------------   TABLE TRUNCATED  ------------------')

  console.log(' --------------    STEP 2/11 : Generate Role  ------------------')
  const roleUser = await roleGenerator('user', 'USER')
  const roleAdmin = await roleGenerator('admin', 'ADMIN')

  console.log(' --------------    STEP 3/11 : Generate User  ------------------')
  const user1 = await userGenerator('user1', 'UserName1', 'user1@mail.com', 'test', roleUser)
  const user2 = await userGenerator('user2', 'UserName2', 'user2@mail.com', 'test', roleUser)
  const alexis = await userGenerator('Alexis', 'test1', 'alexis@mail.com', 'test', roleAdmin)
  const rudy = await userGenerator('Rudy', 'test2', 'rudy@mail.com', 'test', roleAdmin)
  const pierre = await userGenerator('Pierre', 'test3', 'pierre@mail.com', 'test', roleAdmin)
  const matthieu = await userGenerator('Matthieu', 'test4', 'matthieu@mail.com', 'test', roleAdmin)

  console.log(' --------------    STEP 4/11 : Generate Status  ------------------');
  const statusToDo = await statusGenerator('To Do');
  const statusInProgress = await statusGenerator('In Progress');
  const codeReview = await statusGenerator('Code Review');
  const statusDone = await statusGenerator('Done');

  console.log(' --------------    STEP 5/11 : Generate Language  ------------------');
  const languagePHP = await languageGenerator('PHP');
  const languageJS = await languageGenerator('JS');
  const languageTS = await languageGenerator('TS');
  const languageCSS = await languageGenerator('CSS');
  const languageHTML = await languageGenerator('HTML');

  console.log(' --------------    STEP 6/11 : Generate Project  ------------------');
  const project1 = await projectGenerator('Redlion', 'Application to manage ticket in a team, change the status of a task ...', 'Manage ticket', 600, [languagePHP, languageJS, languageHTML], alexis, statusInProgress);
  const project2 = await projectGenerator('KitchenApp', 'Application to manage aliments in our fridge', 'Manage our food', 450, [languageTS, languageHTML, languageCSS], matthieu, statusToDo);
  const project3 = await projectGenerator('SpotifyLike', 'Application based on the spotify app', 'Manage our music', 800, [languagePHP, languageJS], matthieu, statusToDo);
  const project4 = await projectGenerator('GardenApp', 'Application to manage our garden, know how to keep or plants alive', 'Manage our plants', 550, [languagePHP, languageJS], matthieu, statusToDo);
  const project5 = await projectGenerator('LoveApp', 'Application to find the most beautiful developers near you', 'Find love', 350, [languagePHP, languageJS], matthieu, statusDone);

  console.log('  --------------    STEP 7/11 : Generate Project Role  ------------------');
  const graphiste = await projectRoleGenerator('Graphiste');
  const chefDeProjet = await projectRoleGenerator('Chef de Projet');
  const developpeur = await projectRoleGenerator('Developpeur');
  const scrumMaster = await projectRoleGenerator('Scrum Master');


  console.log('  --------------    STEP 8/11 : Generate UserProject  ------------------');
  const userProject1 = await userProjectGenerator(alexis, project1, developpeur);
  const userProject2 = await userProjectGenerator(matthieu, project1, developpeur);
  const userProject3 = await userProjectGenerator(rudy, project1, developpeur);
  const userProject4 = await userProjectGenerator(pierre, project1, developpeur);

  console.log(' --------------    STEP 9/11 : Generate Task  ------------------');
  // Project 1
  const task1 = await taskGenerator('[MOBILE] Change the mobile design', 'Mobile design', 'Change the design aspect of the mobile app', project1.id, 100, 0, statusToDo, pierre);
  const task2 = await taskGenerator('[FRONT] Manage the React Routes', 'Routes React', 'Manage the different routes of the front app', project1.id, 100, 0,  statusToDo, rudy);
  const task3 = await taskGenerator('[FRONT] Apply the theme of material ui', 'Material UI design', 'Change the components to apply the theme of material ui', project1.id, 100, 55,  statusInProgress, matthieu);
  const task4 = await taskGenerator('[FRONT] Change the card of a task', 'Design Task', 'Adapt the view of a task baased on the wireframes', project1.id, 100, 75,  statusInProgress, matthieu);
  const task5 = await taskGenerator('[BACK] Manage the test on the back', 'Back Test', 'Manage the different test with all the resolvers', project1.id, 100, 95,  codeReview, alexis);
  const task6 = await taskGenerator('[BACK] Change the status of a project', 'Back Status Project', 'As a user i can change the status of a project', project1.id, 100, 100,  statusDone, alexis);
  const task7 = await taskGenerator('[BACK] Creation of the different fixtures', 'Back Fixtures', 'Make fixtures for all the entites of the project', project1.id, 100, 60,  statusInProgress, alexis);

  // Project 2
  const task8 = await taskGenerator('[MOBILE] Initialisation', 'Mobile initialisation', 'Initiate the project on react native', project2.id, 100, 0,  statusToDo);
  const task9 = await taskGenerator('[FRONT] Initialisation', 'Front initialisation', 'Initiate the project on react', project2.id, 100, 100,  statusDone);
  const task10 = await taskGenerator('[BACK] Installation of Apollo', 'Back Apollo', 'Installation of apollo on the server', project2.id, 100, 75,  statusInProgress);
  const task11 = await taskGenerator('[BACK] Initialisation', 'Back initialisation', 'Initiate the api', project2.id, 100, 90,  codeReview);


  console.log(' --------------    STEP 10/11 : Generate Comment  ------------------');
  const comment1 = await commentGenerator('Super task i loved it !', user1.id, task1.id)

  console.log(' --------------    STEP 11/11 : Associate Language to User  ------------------')
  await userLanguageGenerator(alexis, languagePHP, 5)
  await userLanguageGenerator(alexis, languageJS, 3)
  await userLanguageGenerator(alexis, languageTS, 2)

  console.log(' --------------    DATA FIXTURES SUCCESSFULLY LAUNCHED  ------------------')
  exit()
}

dataFixtures()
