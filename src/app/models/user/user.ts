import { userInterface, IUserClass } from './user.interface';

export class User implements IUserClass {
    user: userInterface;
    token: any;
    constructor(user:userInterface, token:any){
        this.user = user;
        this.token = token;
    }
}