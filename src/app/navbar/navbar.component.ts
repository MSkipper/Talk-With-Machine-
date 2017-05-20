import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
