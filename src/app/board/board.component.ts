import { Component } from "@angular/core";
import { BoardCellComponent } from "../board-cell/board-cell.component";

@Component({
  selector: "board",
  standalone: true,
  imports: [BoardCellComponent],
  templateUrl: "./board.component.html",
})
export class BoardComponent {
  boardItems = Array.from({ length: 10 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => ({
      id: rowIndex * 10 + colIndex + 1,
      value: "",
    })),
  );
}
