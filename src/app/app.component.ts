import { Component, OnInit } from '@angular/core';
import { Actions } from './core/enums/actions.enum';
import {NodeModel} from './core/models/node.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  grids: NodeModel[][] = [];
  action: Actions = 0;

  constructor() {
    for(let i = 0; i < 32; i++) {
      let row:NodeModel[] = [];
      for(let j = 0; j < 74; j++) {
        row.push(new NodeModel(false, false, false, false, i, j));
      }
      this.grids.push(row);
    }

    console.log(this.grids);
  }

  ngOnInit(): void {

  }

  clicked(event: Event, node: NodeModel) {
    if(this.action === Actions.SELECT_START_POSITIONl && !node.isEndNode) {
      node.isStartNode = true;
    }

    else if(this.action === Actions.SELECT_END_POSITION && !node.isStartNode) {
      node.isEndNode = true;
    }

    this.action = (this.action + 1) % 3;

  }

  reset() {

  }

  algorithmSelected(algorthm: string) {

  }


}
