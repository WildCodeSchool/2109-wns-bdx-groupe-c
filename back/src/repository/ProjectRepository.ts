import Project from "../models/Project";
import Status from '../models/Status';
import User from '../models/AppUser';
import Language from "../models/Language";
import ObjectHelpers from "../helpers/ObjectHelper";
import Task from '../models/Task';

class ProjectRepository extends Project {
    static async findAll() {
        return await Project.find({ relations: ['languages', 'createdBy', 'tasks', 'tasks.assignee', 'tasks.status', 'status'], order: { id: 'ASC' } });
    }

    static async findOneById(id: number) {
      return await Project.findOneOrFail({ id }, {
        relations: ['languages', 'createdBy', 'tasks', 'tasks.assignee', 'tasks.status', 'status'],
        order: {
          id: 'ASC'
        }
      } )
    }

    static async createProject(name: string, shortText: string, description: string, initialTimeSpent: number, user: User | null) {

      if (!user) {
        throw new Error('User is not logged in')
      }

      const project = new Project()
      const toDo = await Status.findOneOrFail({name: 'To Do'});
      project.name = name
      project.shortText = shortText
      project.description = description
      project.initialTimeSpent = initialTimeSpent
      project.createdAt = new Date()
      project.updatedAt = new Date()
      project.createdBy = user;
      project.status = toDo;
      await project.save()
      return Project.findOne({ id: project.id }, { relations: ['languages','createdBy', 'tasks', 'status'] })
    }

    static async deleteProject(id: number) {
      const project = await Project.findOneOrFail({ id }, { relations: ['languages','createdBy', 'tasks', 'status'] })
      const projectSelected = ObjectHelpers.deepClone(project);
      await Project.remove(project)
      return projectSelected
    }

    static async updateLanguage(id: number, languagesId: number[]) {
      const project = await Project.findOneOrFail({ id }, { relations: ['languages','createdBy', 'tasks', 'status'] })
      const languages = await Language.findByIds(languagesId)
      project.languages = languages;
      await project.save();
      return await Project.findOneOrFail({ id }, { relations: ['languages','createdBy', 'tasks', 'status'] });
    }

    static async resetAllTasks(id: number) {
      const project = await Project.findOneOrFail({ id }, { relations: ['languages','createdBy', 'tasks', 'status'] })
      if (project.tasks) {
        await Task.remove(project.tasks)
      }

      return await Project.findOneOrFail({ id }, { relations: ['languages','createdBy', 'tasks', 'status'] });
    }

}

export default ProjectRepository