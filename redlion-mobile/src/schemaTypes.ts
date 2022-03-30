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
// GraphQL query operation: Projects
// ====================================================

export interface Projects_projects {
  project : {
    __typename: "Project";
    id: string;
    name: string;
    shortText: string;
    description: string;
    initialTimeSpent: number;
    createdAt: any;
    updatedAt: any;
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
// GraphQL query operation: Task
// ====================================================

export interface Task_task_status {
  __typename: "Status";
  name: string;
}

export interface Task_task_assignee {
  __typename: "User";
  firstName: string;
}

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
// GraphQL query operation: Tasks
// ====================================================

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

export interface Tasks_tasks {
  task : {
    __typename: "Task";
    id: string;
    subject: string;
    shortText: string;
    description: string;
    status: Tasks_tasks_status | null;
    createdAt: any;
    updatedAt: any;
    dueDate: any;
    expectedDuration: number;
    spentTime: number;
    comments: Tasks_tasks_comments[];
  }
}

export interface Tasks {
  tasks: Tasks_tasks[];
}

export interface TasksVariables {
  projectId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
