import Status from '../models/Status'

export const statusGenerator = async (name: string) => {
  const statusTest = new Status();
  statusTest.name = name;
  return await statusTest.save();
};