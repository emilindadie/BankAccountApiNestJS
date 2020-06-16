import { IUser, CreateUserDto } from "../../../src/models";

export const createUserDto = new CreateUserDto();
createUserDto.email = 'dadie.emilin@gmail.com';
createUserDto.name = 'Emilin';
createUserDto.password = 'toto';
createUserDto.address = '14 rue de Mulhouse';

export const userMock: IUser = {
    id : 1,
    name : 'Emilin',
    address: '',
    email: 'dadie.emilin@gmail.com',
    accounts: [],
};
