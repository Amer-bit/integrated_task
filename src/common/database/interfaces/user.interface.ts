import { Op } from "sequelize";

export interface IExposedUser {
    firstName: string;
    lastName: string;
    email: string;
    username:string;
    password: string;
}

export interface IUser extends IExposedUser {
    id: number;
    createdAt: Date;
    updatedAt?: Date;
    DeletedAt?: Date;
}

interface IQueryValues {
    firstName?: string;
    email?: string;
    lastName?: string;
    username?:string;
}


export interface IUsersQueryOptions {
    [Op.or]?: IQueryValues[],
    [Op.and]?: IQueryValues[],
}