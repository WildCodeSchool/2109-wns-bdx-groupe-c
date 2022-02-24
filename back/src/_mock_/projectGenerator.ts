import Language from '../models/Language';
import Project from '../models/Project';

export const projectGenerator = async (
  name: string,
  description: string,
  shortText:string,
  initialTimeSpent:0,
  languages?: Language[]
  ) => {
  const projectTest = new Project();
  projectTest.name = name;
  projectTest.description = description;
  projectTest.shortText = shortText;
  projectTest.initialTimeSpent = initialTimeSpent;
  projectTest.createdAt = new Date('2021-11-23T23:18:00.134Z');
  projectTest.updatedAt = new Date('2021-11-23T23:18:00.134Z');

  if(languages) projectTest.languages = languages;
  return await projectTest.save();
};