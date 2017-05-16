import {StudentInterface} from "./StudentInterface";
import {AbstractUser} from "./AbstractUser";

export class Student extends AbstractUser implements StudentInterface {
    protected indeks: number;

    constructor (firtName: string, lastName: string, email: string, indeks: number) {
        super();
        this.firstName = firtName;
        this.lastName = lastName;
        this.email = email;
        this.indeks = indeks;
    };

    getIndeks(): number {
        return this.indeks;
    }

    setIndeks(indeks: number) {
        this.indeks = indeks;

        return this;
    }
}