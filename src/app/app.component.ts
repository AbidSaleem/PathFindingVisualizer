import { Component, OnInit } from '@angular/core';
import { Algorithms } from './core/enums/algorithms-enums';
import { NodeModel } from './core/models/node.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  grids: NodeModel[][] = [];
  algorithm = Algorithms.NONE;
  allNodes: NodeModel[] = [];
  unvisitedNodes: NodeModel[] = [];
  visitedNodes: NodeModel[] = [];
  pathNodes: NodeModel[] = [];
  endNodeFound = false;

  constructor() {
    for (let i = 0; i < 30; i++) {
      let row: NodeModel[] = [];
      for (let j = 0; j < 73; j++) {
        let newNode = new NodeModel(i, j);
        row.push(newNode);
        this.allNodes.push(newNode);
      }
      this.grids.push(row);
    }
  }

  ngOnInit(): void {

  }

  reset() {

  }

  algorithmSelected(algorthm: string) {
    switch (algorthm) {
      case 'Dijkstra':
        this.algorithm = Algorithms.DIJKSTRA;
        break;
      case 'A*':
        this.algorithm = Algorithms.A_STAR;
    }
  }

  playClicked() {

    if(this.algorithm === Algorithms.DIJKSTRA) {
      this.dijkstra();
    }

  }

  async dijkstra() {
    let startNode = this.allNodes.filter(n => n.isStartNode)[0];

    this.unvisitedNodes.push(startNode);

    while(this.unvisitedNodes.length > 0 && !this.endNodeFound) {
      let currentNode = this.unvisitedNodes.shift();

      if(currentNode) {
        this.addNeighbors(currentNode);
        this.visitedNodes.push(currentNode);
      }
    }

    for(let node of this.visitedNodes) {

      node.isVisited = true;

      await this.delay(50);
    }
  }

  addNeighbors(node: NodeModel) {

    if(node) {

      this.addNeighbor(this.grids[node.row - 1][node.column], node);

      this.addNeighbor(this.grids[node.row + 1][node.column], node);

      this.addNeighbor(this.grids[node.row][node.column + 1], node);

      this.addNeighbor(this.grids[node.row][node.column - 1], node);
    }
  }

  addNeighbor(neighbor: NodeModel, node: NodeModel) {

    if(neighbor && !neighbor.isWall){

      if(neighbor.distance > node.distance + 1) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
        this.unvisitedNodes.push(neighbor);
      }

      if(neighbor.isEndNode) {
        this.endNodeFound = true;
        neighbor.previousNode = node;
        this.visitedNodes.push(neighbor);
      }

    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
