import {UserInterface } from './UserInterface';
import {Human} from "./Human";

export abstract class AbstractUser extends Human implements UserInterface{
    protected email: string;

    get Email(): string {
        return this.email;
    }

    set Email(email: string) {
        this.email = email;
    }
}

