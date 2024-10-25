import { Component, model, signal } from "@angular/core";
import { BoardCellComponent } from "../board-cell/board-cell.component";
import { DraggingService } from "../services/dragging/dragging.service";
import { Ship, ShipTypes } from "../app.component";

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
  currentShips = model.required<Ship[]>();

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

  constructor(private draggingService: DraggingService) {}

  onCellMouseEnter(cell: CellStructure) {
    if (!this.draggingService.isDragging()) return;

    this.boardItems.update((prevBoard) => {
      const elementsToRight = prevBoard.length - 1 - cell.j;
      const shipObject = this.draggingService.shipObject();
      if (!shipObject) return prevBoard;
      const shipWidth = this.draggingService.getShipWidthFromType(
        shipObject.type,
      );
      if (elementsToRight <= 3) {
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
    const { isDragging, shipObject } = this.draggingService;
    const shipId = shipObject()?.id;
    if (!shipId) return;
    this.currentShips.update((prevShips) => {
      return prevShips.filter((curShip) => curShip.id !== shipId);
    });

    console.log(this.currentShips(), shipObject());
  }
}
