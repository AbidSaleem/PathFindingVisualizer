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
  previousNode: NodeModel;

  constructor(
    row: number = 0,
    column: number = 0,
  ) {

    this.isStartNode = false;
    this.isEndNode = false;
    this.isWall = false;
    this.isVisited = false;
    this.row = row;
    this.column = column;
    this.distance = Infinity;

  }

}
