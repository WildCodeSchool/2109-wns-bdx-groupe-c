import getDatabaseConnection from "../database-connection";
import dotenv from 'dotenv'
import { userGenerator } from "../_mock_/userGenerator";
import { commentGenerator } from "../_mock_/commentGenerator";
import { projectGenerator } from "../_mock_/projectGenerator";
import { taskGenetor } from "../_mock_/taskGenerator";
import { exit } from "process";
import { roleGenerator } from "../_mock_/roleGenerator";


const dataFixtures = async () => {
  console.log(' --------------    LAUNCHING DATA FIXTURES  ------------------');

  console.log(' --------------    STEP 1/6 : Connect to database  ------------------');
  if (!process.env.DATABASE_URL) {
    throw Error("DATABASE_URL must be set in environment.");
  }
  await getDatabaseConnection(process.env.DATABASE_URL);
  console.log("Connected to database");

  console.log(' --------------    STEP 2/6 : Generate User  ------------------');
  const roleUser = await roleGenerator('user', 'user');
  const roleAdmin = await roleGenerator('admin', 'admin');

  console.log(' --------------    STEP 3/6 : Generate User  ------------------');
  const user1 = await userGenerator('user1', 'UserName1', 'user1@mail.com', 'test', roleUser);
  const user2 = await userGenerator('user2', 'UserName2', 'user2@mail.com', 'test', roleUser);
  const user3 = await userGenerator('Alexis', 'test1', 'alexis@mail.com', 'test', roleAdmin)
  const user4 = await userGenerator('Rudy', 'test2', 'rudy@mail.com', 'test', roleAdmin)
  const user5 = await userGenerator('Pierre', 'test3', 'pierre@mail.com', 'test', roleAdmin)
  const user6 = await userGenerator('Matthieu', 'test4', 'matthieu@mail.com', 'test', roleAdmin)

  console.log(' --------------    STEP 4/6 : Generate Project  ------------------');
  const project1 = await projectGenerator('name1', 'description1', 'shortText1', 0);
  const project2 = await projectGenerator('name2', 'description2', 'shortText2', 0);

  console.log(' --------------    STEP 5/6 : Generate Task  ------------------');
  // Project 1
  const task1 = await taskGenetor('subject1', 'Short Text1', 'Description1', project1.id);
  const task2 = await taskGenetor('subject2', 'Short Text2', 'Description2', project1.id);
  const task3 = await taskGenetor('subject3', 'Short Text3', 'Description3', project1.id);
  const task4 = await taskGenetor('subject4', 'Short Text4', 'Description4', project1.id);
  const task5 = await taskGenetor('subject5', 'Short Text5', 'Description5', project1.id);
  const task6 = await taskGenetor('subject5', 'Short Text5', 'Description6', project1.id);

  // Project 2
  const task7 = await taskGenetor('subject7', 'Short Text7', 'Description7', project2.id);
  const task8 = await taskGenetor('subject8', 'Short Text8', 'Description8', project2.id);
  const task9 = await taskGenetor('subject9', 'Short Text9', 'Description9', project2.id);
  const task10 = await taskGenetor('subject10', 'Short Text10', 'Description10', project2.id);

  console.log(' --------------    STEP 6/6 : Generate Comment  ------------------');
  const comment1 = await commentGenerator('test2', user1.id, task1.id)

  console.log(' --------------    DATA FIXTURES SUCCESSFULLY LAUNCHED  ------------------');
  exit();
}

dataFixtures();