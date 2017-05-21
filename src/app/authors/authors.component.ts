import { Component, OnInit } from '@angular/core';
import {Student} from "./shared/student.model";
import {Author} from "./shared/author.model";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})

export class AuthorsComponent implements OnInit {
  authors: Array<Author> = [];

  constructor() {
    let andrzej = new Author("Andrzej", "Piszczek", "andpis58@gmail.com", "174644");
    let mikolaj = new Author('Mikołaj', 'Sikorski', 'mik.sikorski@gmail.com', "174906");

    //which convecnion is correct?
    andrzej
        .setIndeks("174644")
        .FirstName = 'Andrzej';
    andrzej.Profession = 'Full stack developer';
    andrzej.Skills = ['PHP', 'JS', 'Symfony', 'Rest'];
    andrzej.GithubUrl = new URL('https://github.com/piszczek/');
    andrzej.ProfileImageUrl = new URL('https://avatars1.githubusercontent.com/u/9069664?v=3&s=460');
    andrzej.FacebookUrl = new URL('https://www.facebook.com/and.piszczek');
    andrzej.LinkedinUrl = new URL('https://www.linkedin.com/in/andrzej-piszczek-2a1421110/');

    mikolaj.Profession = 'Front-end developer';
    mikolaj.Skills = ['JS', 'Angular', 'Rest'];
    mikolaj.GithubUrl = new URL('https://github.com/MSkipper/');
    mikolaj.ProfileImageUrl = new URL('https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAJZAAAAJGZlY2MyZjQwLTA4NmEtNDczZS05MTllLTQ0MjVhYTg0NzRjYw.jpg');
    mikolaj.FacebookUrl = new URL('https://www.facebook.com/mikifuks');
    mikolaj.LinkedinUrl = new URL('https://www.linkedin.com/in/miko%C5%82aj-sikorski-4aa2a79b/');

    this.authors.push(
        andrzej,
        mikolaj
    );
  }

  ngOnInit() {


  }

}
