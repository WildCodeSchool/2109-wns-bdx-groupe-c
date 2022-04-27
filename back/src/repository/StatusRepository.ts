import ObjectHelpers from '../helpers/ObjectHelper';
import Status from '../models/Status'

class StatusRepository extends Status {
  static async findAll() {
    return await Status.find();
  }

  static async createStatus(name: string) {
    const status = new Status();
    status.name = name;
    return status.save();
  }

  static async deleteStatus(id: number) {
    const status = await Status.findOneOrFail({ id })
    const statusCopy = ObjectHelpers.deepClone(status);
    await Status.remove(status)
    return statusCopy
  }

  static async findTaskByStatusByProject(projectId: number) {
    const statusFound =  await Status.find({
      relations: ['tasks', 'tasks.project'],
      order: {id: 'ASC'}
    })
    return statusFound
    .map((status) => {
      return {
        ...status, tasks: status.tasks && status.tasks.filter((task) => task.project.id === projectId)
      }
    });
  }
}

export default StatusRepository