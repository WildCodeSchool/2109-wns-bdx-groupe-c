import { createConnection } from 'typeorm'
import { LIST_ENTITIES } from './constants'

import dotenv from 'dotenv'

dotenv.config()

const getDatabaseConnection = async (url: string, logging = false) => {
  return createConnection({
    type: 'postgres',
    url,
    entities: LIST_ENTITIES,
    synchronize: true,
    logging
  })
}

export default getDatabaseConnection
