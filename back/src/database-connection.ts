import { createConnection } from 'typeorm'
import AppUser from './models/AppUser';
import Comment from './models/Comment';
import Language from './models/Language';
import Project from './models/Project';
import ProjectRole from './models/ProjectRole';
import Role from './models/Role';
import Status from './models/Status';
import Task from './models/Task';
import UserLanguage from './models/UserLanguage';
import UserProject from './models/UserProject';


import dotenv from 'dotenv'

dotenv.config()

const getDatabaseConnection = async (url: string, logging = false) => {
  return createConnection({
    type: 'postgres',
    url,
    entities: [AppUser, Comment, Language, Project, ProjectRole, Role, Status, Task, UserLanguage, UserProject],
    synchronize: true,
    logging
  })
}

export default getDatabaseConnection
