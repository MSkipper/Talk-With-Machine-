import { Component, OnInit } from '@angular/core';
import {Student} from "./Student";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})

export class AuthorsComponent implements OnInit {
  students: Array<Student> = [];


  constructor() {
    let firstStudnet = new Student('Andrzej', 'Piszczek', 'andpis58@gmail.com', 174644);

    //which convecnion is correct?
    firstStudnet
        .setIndeks(174644)
        .FirstName = 'Andrzej';
    firstStudnet.LastName = 'Piszczek';
    firstStudnet.Email = 'andpis58@gmail.com';

    let secondStudent =
        new Student('Mikołaj', 'Sikorski', 'mik.sikorski@gmail.com', 123456);

    this.students.push(firstStudnet, secondStudent);
  }

  ngOnInit() {


  }

}
