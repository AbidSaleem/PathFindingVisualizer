import { Component, Input, OnInit } from '@angular/core';
import {NodeModel} from '../../models/node.model';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() node: NodeModel;

  constructor() {
   }

  ngOnInit(): void {
  }


}
