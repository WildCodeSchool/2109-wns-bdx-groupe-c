
import {createConnection} from 'typeorm';

import Comment from "./models/Comment";
import Language from "./models/Language";
import Project from "./models/Project";
import ProjectRole from "./models/ProjectRole";
import Role from "./models/Role";
import Status from "./models/Status";
import Task from './models/Task';
import User from "./models/User";
import UserProject from './models/Task';

export default async (database: string, logging = false) => {
    await createConnection({
        type: "sqlite",
        database,
        entities: [
            Comment,
            Language,
            Project,
            ProjectRole,
            Role,
            Status,
            Task,
            User,
            UserProject
        ],
        synchronize: true,
        logging,
    });
};