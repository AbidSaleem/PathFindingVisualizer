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
  startNode: NodeModel;
  endNode: NodeModel;
  heuristic: number;

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

  async playClicked() {
    this.startNode = this.allNodes.filter(n => n.isStartNode)[0];
    this.endNode = this.allNodes.filter(n => n.isEndNode)[0];
    this.heuristic = this.calculateHeuristic(this.startNode, this.endNode);

    this.unvisitedNodes.push(this.startNode);

    while(this.unvisitedNodes.length > 0 && !this.endNodeFound) {
      let currentNode = this.unvisitedNodes.shift();

      if(currentNode) {
        this.addNeighbors(currentNode);
        this.visitedNodes.push(currentNode);
      }
    }

    for(let node of this.visitedNodes) {

      node.isVisited = true;

      await this.delay(1);
    }

    let pathNode: NodeModel = this.endNode;

    while(!pathNode.isStartNode) {
      this.pathNodes.unshift(pathNode);
      pathNode = pathNode.previousNode;
    }

    this.startNode.isOnPath = true;

    for(let node of this.pathNodes) {

      node.isOnPath = true;

      await this.delay(10);
    }

  }

  async addNeighbors(node: NodeModel) {

    if(node) {

      try {
        this.addNeighbor(this.grids[node.row - 1][node.column], node);

      } catch {}
      try {
        this.addNeighbor(this.grids[node.row + 1][node.column], node);

      } catch {}
      try {
        this.addNeighbor(this.grids[node.row][node.column + 1], node);

      } catch {}
      try {
        this.addNeighbor(this.grids[node.row][node.column - 1], node);

      } catch {}
    }
  }

  addNeighbor(neighbor: NodeModel, node: NodeModel) {

    if(neighbor && !neighbor.isWall){

      if(neighbor.distance > node.distance + 1) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;

        if(this.algorithm === Algorithms.DIJKSTRA) {
          this.dijkstra(neighbor);
        }

        else if(this.algorithm === Algorithms.A_STAR) {
          this.a_star(neighbor);
        }
      }

      if(neighbor.isEndNode) {
        this.endNodeFound = true;
        neighbor.previousNode = node;
        this.visitedNodes.push(neighbor);
      }
    }
  }


  dijkstra(neighbor: NodeModel) {
    this.unvisitedNodes.push(neighbor);
  }

  a_star(neighbor: NodeModel) {

    let currentHeuristic = this.calculateHeuristic(neighbor, this.endNode);
    neighbor.f_score = neighbor.distance + currentHeuristic;

    this.unvisitedNodes.push(neighbor);
    this.unvisitedNodes.sort((a, b) => a.f_score - b.f_score);
  }

  calculateHeuristic(node: NodeModel, endNode: NodeModel) {
    return Math.abs(node.row - endNode.row) + Math.abs(node.column - endNode.column);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
