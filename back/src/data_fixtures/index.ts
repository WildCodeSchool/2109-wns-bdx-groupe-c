import getDatabaseConnection from "../database-connection";
import dotenv from 'dotenv'
import { userGenerator } from "../_mock_/userGenerator";
import { commentGenerator } from "../_mock_/commentGenrator";
import { projectGenerator } from "../_mock_/projectGenerator";
import { taskGenetor } from "../_mock_/taskGenerator";
import { exit } from "process";


const dataFixtures = async () => {
  console.log(' --------------    LAUNCHING DATA FIXTURES  ------------------');

  console.log(' --------------    STEP 1/5 : Connect to database  ------------------');
  if (!process.env.DATABASE_URL) {
    throw Error("DATABASE_URL must be set in environment.");
  }
  await getDatabaseConnection(process.env.DATABASE_URL);
  console.log("Connected to database");

  console.log(' --------------    STEP 2/5 : Generate User  ------------------');
  const user1 = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
  const user2 = await userGenerator('Alexis', 'test1', 'nouveau@mail.com', 'password')
  const user3 = await userGenerator('Rudy', 'test2', 'nouveau@mail.com', 'password')

  console.log(' --------------    STEP 3/5 : Generate Project  ------------------');
  const project1 = await projectGenerator('Test', 'Test', 'Test', 0)

  console.log(' --------------    STEP 4/5 : Generate Task  ------------------');
  const task1 = await taskGenetor('Task Text', 'Short Text', 'Description', 1)

  console.log(' --------------    STEP 5/5 : Generate Comment  ------------------');
  const comment1 = await commentGenerator('Comment Text', user1.id, task1.id)

  console.log(' --------------    DATA FIXTURES SUCCESSFULLY LAUNCHED  ------------------');
  exit();
}

dataFixtures();