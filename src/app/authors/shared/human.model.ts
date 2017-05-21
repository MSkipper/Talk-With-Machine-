export class Human {
    protected firstName : string;
    protected lastName : string;

    get FirstName() : string {
        return this.firstName;
    }

    set FirstName(value : string) {
        console.log("Set FirstName : ", value);
        this.firstName = value;
    }

    get LastName() : string {
        return this.lastName;
    }

    set LastName(value : string) {
        this.lastName = value;
    }
}