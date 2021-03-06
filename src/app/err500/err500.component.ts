import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-err500',
  templateUrl: './err500.component.html',
  styleUrls: ['./err500.component.css']
})
export class Err500Component implements OnInit {

  constructor(public router: Router, public _route: ActivatedRoute) { }

  ngOnInit() {

    setTimeout(() => {
      this.router.navigate(['/registration'])
    }, 4000);

  }

}