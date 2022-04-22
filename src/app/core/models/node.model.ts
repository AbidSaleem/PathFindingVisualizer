import { Actions } from "../enums/actions.enum";

export class NodeModel {

  static action: Actions = 0;
  static mouseHovering = false;
  isStartNode: boolean;
  isEndNode: boolean;
  isWall: boolean;
  isVisited: boolean;
  row: number;
  column: number;
  distance: number;

  constructor(
    isStartNode = false,
    isEndNode = false,
    isWall = false,
    isVisited = false,
    row: number = 0,
    column: number = 0,
  ) {

    this.isStartNode = isStartNode;
    this.isEndNode = isEndNode;
    this.isWall = isWall;
    this.isVisited = isVisited;
    this.row = row;
    this.column = column;
    this.distance = Infinity;


  }
}
