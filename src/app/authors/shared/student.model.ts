import {StudentInterface} from "./student.interface";
import {AbstractUser} from "./user.abstract";

export class Student extends AbstractUser implements StudentInterface {
    protected indeks: string;

    constructor (firtName: string, lastName: string, email: string, indeks: string) {
        super();
        this.firstName = firtName;
        this.lastName = lastName;
        this.email = email;
        this.indeks = indeks;
    };

    getIndeks(): string {
        return this.indeks;
    }

    setIndeks(indeks: string) {
        this.indeks = indeks;

        return this;
    }
}