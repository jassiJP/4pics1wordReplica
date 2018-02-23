import { Component, OnInit, Input } from '@angular/core';
import { Pic } from './pic.model';

@Component({
  selector: 'app-pic',
  templateUrl: './pic.component.html',
  styleUrls: ['./pic.component.css']
})
export class PicComponent implements OnInit {
  @Input() pic: Pic; 

  constructor() { }

  ngOnInit() {
  }

}
