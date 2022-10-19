import * as dotenv from 'dotenv';
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { User } from 'src/common/database/models/user.model';

dotenv.config();


interface IDatabaseConfig {
    development?: SequelizeModuleOptions
    production?: SequelizeModuleOptions
}
interface IConfig {
    database: IDatabaseConfig
}

const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USER || 'postgres' ,
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'tis',
        host: process.env.DB_HOST  || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        models: [User],
        dialect: 'postgres',
    }
}
export const config: IConfig = {
    database: databaseConfig
}


