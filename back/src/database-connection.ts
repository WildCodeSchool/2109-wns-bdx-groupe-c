import { createConnection } from 'typeorm'

import dotenv from 'dotenv'

dotenv.config()

const getDatabaseConnection = async (url: string, logging = false) => {
  await createConnection({
    type: 'mysql',
    url,
    entities: ['build/models/*.js'],
    synchronize: true,
    logging
  })
}

export default getDatabaseConnection
