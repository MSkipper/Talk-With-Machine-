import {UserInterface} from "./UserInterface";
export interface StudentInterface extends UserInterface {
    getIndeks(): number;
    setIndeks(indeks: number): StudentInterface;
}