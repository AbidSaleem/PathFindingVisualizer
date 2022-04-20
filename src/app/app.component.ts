import { Component, OnInit } from '@angular/core';
import {NodeModel} from './core/models/node.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  grids: NodeModel[][] = [];

  constructor() {
    for(let i = 0; i < 32; i++) {
      let row:NodeModel[] = [];
      for(let j = 0; j < 58; j++) {
        row.push(new NodeModel(false, false, false, false, i, j));
      }
      this.grids.push(row);
    }

    console.log(this.grids);
  }

  ngOnInit(): void {

  }


}
