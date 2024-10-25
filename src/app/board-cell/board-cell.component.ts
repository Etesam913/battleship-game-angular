import { Component, Input } from "@angular/core";
import { CellStructure } from "../board/board.component";

@Component({
  selector: "board-cell",
  standalone: true,
  imports: [],
  templateUrl: "./board-cell.component.html",
})
export class BoardCellComponent {
  @Input() cell!: CellStructure;
}
