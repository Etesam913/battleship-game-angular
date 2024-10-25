import { Component, signal } from "@angular/core";
import { BoardCellComponent } from "../board-cell/board-cell.component";
import { DraggingService } from "../services/dragging/dragging.service";
import {
  GameStateService,
  ShipTypes,
} from "../services/dragging/game-state/game-state.service";

export type BoardStructure = CellStructure[][];

export type CellStructure = {
  id: number;
  value: ShipTypes | null;
  isHighlighted: boolean;
  i: number;
  j: number;
};

@Component({
  selector: "board",
  standalone: true,
  imports: [BoardCellComponent],
  templateUrl: "./board.component.html",
})
export class BoardComponent {
  boardItems = signal<BoardStructure>(
    Array.from({ length: 10 }, (_, rowIndex) =>
      Array.from({ length: 10 }, (_, colIndex) => ({
        id: rowIndex * 10 + colIndex + 1,
        value: null,
        isHighlighted: false,
        i: rowIndex,
        j: colIndex,
      })),
    ),
  );

  constructor(
    private draggingService: DraggingService,
    private gameStateService: GameStateService,
  ) {}

  onCellMouseEnter(cell: CellStructure) {
    if (!this.draggingService.isDragging()) return;

    this.boardItems.update((prevBoard) => {
      const elementsToRight = prevBoard.length - cell.j;
      const shipObject = this.draggingService.shipObject();
      if (!shipObject) return prevBoard;
      const shipWidth = this.draggingService.getShipWidthFromType(
        shipObject.type,
      );
      if (elementsToRight < shipWidth) {
        return prevBoard;
      }
      const copyOfBoard = prevBoard.map((arr) => [...arr]);
      for (let r = 0; r < shipWidth; r++) {
        copyOfBoard[cell.i][cell.j + r].isHighlighted = true;
      }

      return copyOfBoard;
    });
  }

  onCellMouseLeave() {
    if (!this.draggingService.isDragging()) return;
    //clearing out the highlights

    this.boardItems.update((prevBoard) => {
      const copyOfBoard = prevBoard.map((arr) => {
        return arr.map((v) => {
          return { ...v, isHighlighted: false };
        });
      });

      return copyOfBoard;
    });
  }

  onCellMouseUp(cell: CellStructure) {
    const { shipObject } = this.draggingService;
    const shipId = shipObject()?.id;
    const shipType = shipObject()?.type;
    if (!shipId || !shipType) return;
    const shipWidth = this.draggingService.getShipWidthFromType(shipType);
    const elementsToRight = this.boardItems().length - cell.j;

    if (elementsToRight < shipWidth) return;
    this.gameStateService.currentShips.update((prevShips) => {
      return prevShips.filter((curShip) => curShip.id !== shipId);
    });

    console.log(this.gameStateService.currentShips(), shipObject());
  }
}
