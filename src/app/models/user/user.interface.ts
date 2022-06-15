export interface userInterface {
    id: number,
    name: string,
    profile_image: string,
    mobile: number,
    address: string,
    wallet: any
}

export interface IUserClass {
    user: userInterface;
    token: string;
}