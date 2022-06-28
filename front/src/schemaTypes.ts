/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Project
// ====================================================

export interface Project_projects {
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
  projects: Project_projects[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Language
// ====================================================

export interface Languages_Languages {
  language : {
    __typename: "Language";
    id: string;
    name: string;
    rating: number;
  }
}

export interface Languages {
  projects: Languages_Languages[];
}


//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
