export class Human {
    protected firstName : string;
    protected lastName : string;

    get FirstName() : string {
        console.log("Get FirstName : ", this.firstName);
        return this.firstName;
    }
    set FirstName(value : string) {
        console.log("Set FirstName : ", value);
        this.firstName = value;
    }

    get LastName() : string {
        console.log("Get LastName : ", this.lastName);
        return this.lastName;
    }
    set LastName(value : string) {
        console.log("Set LastName : ", value);
        this.lastName = value;
    }

}