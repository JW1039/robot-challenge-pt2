import { IGridEntity } from "src/utils/interfaces";

/**Command: An empty grid entity*/
export class EmptyGridEntity implements IGridEntity {
  getCharacter(): string {
    return ".";
  }
}
