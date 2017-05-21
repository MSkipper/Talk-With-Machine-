import {UserInterface} from "./user.interface";
export interface StudentInterface extends UserInterface {
    getIndeks(): string;
    setIndeks(indeks: string): StudentInterface;
}