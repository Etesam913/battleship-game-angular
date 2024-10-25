import { Component, input, Input, model, WritableSignal } from "@angular/core";
import { BoardStructure, CellStructure } from "../board/board.component";
import { DraggingService } from "../services/dragging/dragging.service";

@Component({
  selector: "board-cell",
  standalone: true,
  imports: [],
  templateUrl: "./board-cell.component.html",
})
export class BoardCellComponent {
  @Input() cell!: CellStructure;
}
