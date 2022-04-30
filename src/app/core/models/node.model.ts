import { Actions } from "../enums/actions.enum";

export class NodeModel {

  static action: Actions = 0;
  static mouseHovering = false;
  isStartNode: boolean;
  isEndNode: boolean;
  isWall: boolean;
  isVisited: boolean;
  isOnPath: boolean;
  row: number;
  column: number;
  distance: number;
  previousNode: NodeModel;
  f_score: number;

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
