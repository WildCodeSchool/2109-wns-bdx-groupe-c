import {createConnection} from 'typeorm';

import dotenv from 'dotenv'

dotenv.config()

const getDatabaseConnection = async () => {
    await createConnection();
}

export default getDatabaseConnection;