import { Component, OnInit } from '@angular/core';
import { Algorithms } from './core/enums/algorithms-enums';
import {NodeModel} from './core/models/node.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  grids: NodeModel[][] = [];
  algorithm = Algorithms.NONE;

  constructor() {
    for(let i = 0; i < 32; i++) {
      let row:NodeModel[] = [];
      for(let j = 0; j < 70; j++) {
        row.push(new NodeModel(false, false, false, false, i, j));
      }
      this.grids.push(row);
    }

    console.log(this.grids);
  }

  ngOnInit(): void {

  }

  reset() {

  }

  algorithmSelected(algorthm: string) {

  }

  playClicked() {

  }


}
