import getDatabaseConnection from "../database-connection";
import dotenv from 'dotenv'
import { userGenerator } from "../_mock_/userGenerator";
import { commentGenerator } from "../_mock_/commentGenerator";
import { projectGenerator } from "../_mock_/projectGenerator";
import { taskGenetor } from "../_mock_/taskGenerator";
import { exit } from "process";
import { roleGenerator } from "../_mock_/roleGenerator";
import { projectRoleGenerator } from "../_mock_/projectRoleGenerator";
import { userProjectGenerator } from "../_mock_/userProjectGenerator";
import { languageGenerator } from "../_mock_/languageGenerator";
import { userLanguageGenerator } from "../_mock_/userLanguageGenerator";
import { statusGenerator } from "../_mock_/statusGenerator";

const dataFixtures = async () => {
  console.log(' --------------    LAUNCHING DATA FIXTURES  ------------------')

  console.log(' --------------    STEP 1/11 : Connect to database  ------------------');
  if (!process.env.DATABASE_URL) {
    throw Error("DATABASE_URL must be set in environment.");
  }
  const connexion = await getDatabaseConnection(process.env.DATABASE_URL);
  console.log("Connected to database");

  const entities = connexion.entityMetadatas;
  // eslint-disable-next-line no-restricted-syntax
  for (const entity of entities) {
    const repository = connexion.getRepository(entity.name);
    await repository.query(
      `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
    );
  }
  console.log(' --------------   TABLE TRUNCATED  ------------------');

  console.log(' --------------    STEP 2/11 : Generate Role  ------------------');
  const roleUser = await roleGenerator('user', 'user');
  const roleAdmin = await roleGenerator('admin', 'admin');


  console.log(' --------------    STEP 3/11 : Generate User  ------------------');
  const user1 = await userGenerator('user1', 'UserName1', 'user1@mail.com', 'test', roleUser);
  const user2 = await userGenerator('user2', 'UserName2', 'user2@mail.com', 'test', roleUser);
  const alexis = await userGenerator('Alexis', 'test1', 'alexis@mail.com', 'test', roleAdmin)
  const rudy = await userGenerator('Rudy', 'test2', 'rudy@mail.com', 'test', roleAdmin)
  const pierre = await userGenerator('Pierre', 'test3', 'pierre@mail.com', 'test', roleAdmin)
  const matthieu = await userGenerator('Matthieu', 'test4', 'matthieu@mail.com', 'test', roleAdmin)

  console.log(' --------------    STEP 4/11 : Generate Status  ------------------');
  const statusToDo = await statusGenerator('To Do');
  const statusInProgress = await statusGenerator('In Progress');
  const codeReview = await statusGenerator('Code Review');
  const statusDone = await statusGenerator('Done');

  console.log(' --------------    STEP 5/11 : Generate Project  ------------------');
  const project1 = await projectGenerator('Project1', 'description1', 'shortText1', 0);
  const project2 = await projectGenerator('Project2', 'description2', 'shortText2', 0);


  console.log('  --------------    STEP 6/11 : Generate Project Role  ------------------');
  const graphiste = await projectRoleGenerator('Graphiste');
  const chefDeProjet = await projectRoleGenerator('Chef de Projet');
  const developpeur = await projectRoleGenerator('Developpeur');
  const scrumMaster = await projectRoleGenerator('Scrum Master');


  console.log('  --------------    STEP 7/11 : Generate UserProject  ------------------');
  const userProject1 = await userProjectGenerator(alexis, project1, developpeur);
  const userProject2 = await userProjectGenerator(matthieu, project1, developpeur);
  const userProject3 = await userProjectGenerator(rudy, project1, developpeur);
  const userProject4 = await userProjectGenerator(pierre, project1, developpeur);

  console.log(' --------------    STEP 8/11 : Generate Task  ------------------');
  // Project 1
  const task1 = await taskGenetor('subject1', 'Short Text1', 'Description1', project1.id, statusToDo, pierre);
  const task2 = await taskGenetor('subject2', 'Short Text2', 'Description2', project1.id, statusToDo, rudy);
  const task3 = await taskGenetor('subject3', 'Short Text3', 'Description3', project1.id, statusToDo, matthieu);
  const task4 = await taskGenetor('subject4', 'Short Text4', 'Description4', project1.id, statusToDo, matthieu);
  const task5 = await taskGenetor('subject5', 'Short Text5', 'Description5', project1.id, statusToDo, alexis);
  const task6 = await taskGenetor('subject6', 'Short Text6', 'Description6', project1.id, statusToDo, alexis);

  // Project 2
  const task7 = await taskGenetor('subject7', 'Short Text7', 'Description7', project2.id, statusToDo);
  const task8 = await taskGenetor('subject8', 'Short Text8', 'Description8', project2.id, statusToDo);
  const task9 = await taskGenetor('subject9', 'Short Text9', 'Description9', project2.id, statusToDo);
  const task10 = await taskGenetor('subject10', 'Short Text10', 'Description10', project2.id, statusToDo);


  console.log(' --------------    STEP 9/11 : Generate Comment  ------------------');
  const comment1 = await commentGenerator('test1', user1.id, task1.id)

  console.log(' --------------    STEP 10/11 : Generate Language  ------------------');
  const languagePHP = await languageGenerator('PHP');
  const languageJS = await languageGenerator('JS');
  const languageTS = await languageGenerator('TS');
  const languageCSS = await languageGenerator('CSS');
  const languageHTML = await languageGenerator('HTML');

  console.log(' --------------    STEP 11/11 : Associate Language to User  ------------------');
  await userLanguageGenerator(alexis, languagePHP, 5);
  await userLanguageGenerator(alexis, languageJS, 3);
  await userLanguageGenerator(alexis, languageTS, 2);

  console.log(' --------------    DATA FIXTURES SUCCESSFULLY LAUNCHED  ------------------');
  exit();
}

dataFixtures();