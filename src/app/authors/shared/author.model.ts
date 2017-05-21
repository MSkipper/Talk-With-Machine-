import {Student} from "./student.model";
import {ProgrammerInterface} from "./programmer.interface";
import {GithubUserInterface} from "./github-user.interface";

export class Author extends Student implements ProgrammerInterface, GithubUserInterface {
    protected githubUrl: URL;
    protected skills: Array<string>;
    protected profession: string;

    protected profileImageUrl: URL;

    set ProfileImageUrl(url: URL) {
        this.profileImageUrl = url;
    }

    get ProfileImageUrl() {
        return this.profileImageUrl;
    }

    set Skills(skills: Array<string>) {
        this.skills = skills;
    }

    get Skills() {
        return this.skills;
    }

    set Profession(profession: string) {
        this.profession = profession;
    }

    get Profession() {
        return this.profession;
    }

    set GithubUrl(url: URL) {
        this.githubUrl = url;
    }

    get GithubUrl() {
        return this.githubUrl;
    }
}