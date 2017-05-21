import {UserInterface } from './user.interface';
import {Human} from "./human.model";

export abstract class AbstractUser extends Human implements UserInterface {
    protected email: string;

    get Email(): string {
        return this.email;
    }

    set Email(email: string) {
        this.email = email;
    }
}

