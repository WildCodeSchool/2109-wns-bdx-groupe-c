/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Projects
// ====================================================

export interface Projects_projects {
  __typename: "Project";
  id: string;
  name: string;
  shortText: string;
  description: string;
  initialTimeSpent: number;
  createdAt: any;
  updatedAt: any;
  createdBy: {
    firstName: string;
    lastName: string;
  }
  languages: {
    id: string;
    name: string;
  }
  tasks: {
    id: string;
    subject: string;
    shortText: string;
    description: string;
  }
  status: {
    name: string;
  }
}

export interface Projects {
  projects: Projects_projects[];
}

export interface ProjectsVariables {
  projectId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Project
// ====================================================

export interface Project_project {
  __typename: "Project";
  id: string;
  name: string;
  shortText: string;
  description: string;
  initialTimeSpent: number;
  createdAt: any;
  updatedAt: any;
  createdBy: {
    firstName: string;
    lastName: string;
  }
  languages: {
    id: string;
    name: string;
  }
  tasks: {
    id: string;
    subject: string;
    shortText: string;
    description: string;
  }
  status: {
    name: string;
  }
}

export interface Project {
  project: Project_project;
}

export interface ProjectVariables {
  projectId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Tasks
// ====================================================

export interface Tasks_tasks {
  task: {
    __typename: "Task";
    id: string;
    subject: string;
    shortText: string;
    description: string;
    status: Task_task_status | null;
    assignee: Task_task_assignee | null;
    createdAt: any;
    updatedAt: any;
    dueDate: any;
    expectedDuration: number;
    spentTime: number;
    comments: Tasks_tasks_comments[];
  }
}

export interface Tasks_tasks_status {
  __typename: "Status";
  name: string;
}

export interface Tasks_tasks_comments {
  __typename: "Comment";
  content: string;
  createdAt: any;
  updatedAt: any;
}

export interface Tasks {
  tasks: Tasks_tasks[];
}

export interface TasksVariables {
  projectId: number;
}

export interface Task_task_status {
  __typename: "Status";
  name: string;
}

export interface Task_task_assignee {
  __typename: "User";
  firstName: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Task
// ====================================================

export interface Task_task {
  __typename: "Task";
  id: string;
  subject: string;
  shortText: string;
  description: string;
  status: Task_task_status | null;
  assignee: Task_task_assignee | null;
  createdAt: any;
  updatedAt: any;
  dueDate: any;
  expectedDuration: number;
  spentTime: number;
}

export interface Task {
  task: Task_task;
}

export interface TaskVariables {
  taskId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users {
  user : {
    __typename: "User";
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: {
      id: number;
      name: string;
    };
    projectsCreated: {
      id: number;
      name: string;
    }
  }
}

export interface Users {
  projects: Users_users[];
}

export interface UsersVariables {
  userId: number;
}

export interface User_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: any;
  role: {
    id: number;
    name: string;
  };
  projectsCreated: {
    id: number;
    name: string;
  }
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  userId: number;
}