import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from "configuration";
import { DEVELOPMENT, PRODUCTION } from "../constants";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [SequelizeModule.forRootAsync({
        useFactory: async () => {
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           return config.database.development;
        case PRODUCTION:
           return config.database.production;
        default:
           return config.database.development;
        }
    },})
]
})
export class DatabaseModule {}
