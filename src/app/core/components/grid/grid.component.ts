import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Actions } from '../../enums/actions.enum';
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

  @HostListener("mousedown")  down() {
    NodeModel.mouseHovering = true;

    if(NodeModel.action === Actions.SELECT_START_POSITION && !this.node.isEndNode) {
      this.node.isStartNode = true;
      this.node.distance = 0;
      NodeModel.action = (NodeModel.action + 1) % 3;
    }

    else if(NodeModel.action === Actions.SELECT_END_POSITION && !this.node.isStartNode) {
      this.node.isEndNode = true;
      NodeModel.action = (NodeModel.action + 1) % 3;
    }

    else if(NodeModel.action === Actions.CREATE_WALL && !this.node.isEndNode && !this.node.isStartNode) {
      this.node.isWall = true;
      console.log(this.node.isWall);
    }
  }

  @HostListener("mouseup") up() {
    NodeModel.mouseHovering = false;
  }

  @HostListener("mousemove") hover() {

    if(NodeModel.action === Actions.CREATE_WALL && !this.node.isEndNode && !this.node.isStartNode && NodeModel.mouseHovering) {
      this.node.isWall = true;
      console.log("should be workin :/");
    }
  }

}
