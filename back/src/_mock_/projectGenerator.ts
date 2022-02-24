import Language from '../models/Language';
import Project from '../models/Project';
import User from '../models/AppUser';
import Status from '../models/Status';

export const projectGenerator = async (
  name: string,
  description: string,
  shortText:string,
  initialTimeSpent:number,
  languages?: Language[],
  createdBy?: User,
  status? : Status,
  ) => {
  const projectTest = new Project();
  projectTest.name = name;
  projectTest.description = description;
  projectTest.shortText = shortText;
  projectTest.initialTimeSpent = initialTimeSpent;
  projectTest.createdAt = new Date('2021-11-23T23:18:00.134Z');
  projectTest.updatedAt = new Date('2021-11-23T23:18:00.134Z');

  if(languages) projectTest.languages = languages;
  if(createdBy) projectTest.createdBy = createdBy;
  if(status) projectTest.status = status;
  return await projectTest.save();
};