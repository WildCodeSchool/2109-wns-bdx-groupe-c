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
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
    logging: Boolean(process.env.TYPEORM_LOGGING),
    entities: ['build/models/*.js'],
    ...(process.env.TYPEORM_SOCKETPATH && { socketPath: process.env.TYPEORM_SOCKETPATH })
  })
}

export default getDatabaseConnection
