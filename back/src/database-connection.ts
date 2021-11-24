import { createConnection } from 'typeorm'

import dotenv from 'dotenv'

dotenv.config()

const getDatabaseConnection = async () => {
  await createConnection({
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT || '3306'),
    ...(process.env.TYPEORM_SOCKETPATH && { socketPath: process.env.TYPEORM_SOCKETPATH }),
  })
}

export default getDatabaseConnection
