import {User} from './types';
import UserRole from 'types/user-role';

let name: string = 'Francisco';
const array: Array<number | string> = [2,'Dos'];

const yo:User = {
    name: 'Fransico',
    lastname: 'Sevilla',
    age: 39
}

yo.email = 'email@email.com';
yo.role = UserRole.CLIENT;

console.log();