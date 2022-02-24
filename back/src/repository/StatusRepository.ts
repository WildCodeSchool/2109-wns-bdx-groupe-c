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
    const statusCopy = { ...status };
    await Status.remove(status)
    return statusCopy
  }
}

export default StatusRepository