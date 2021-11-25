
import {createConnection} from 'typeorm';

import Comment from "./models/Comment";
import Project from "./models/Project";
import ProjectRole from "./models/ProjectRole";
import Role from "./models/Role";
import Status from "./models/Status";
import User from "./models/User";
import Language from "./models/Language";
import Task from './models/Task';

export default async (database: string, logging = false) => {
    await createConnection({
        type: "sqlite",
        database,
        entities: [
            Comment,
            Project,
            ProjectRole,
            Role,
            Status,
            User,
            Language,
            Task
        ],
        synchronize: true,
        logging,
    });
};