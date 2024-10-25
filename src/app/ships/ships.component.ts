import { Component, inject } from "@angular/core";
import { AddDragDirective } from "../directives/add-drag/add-drag.directive";
import { DraggingService } from "../services/dragging/dragging.service";

@Component({
  selector: "ships",
  standalone: true,
  imports: [AddDragDirective],
  templateUrl: "./ships.component.html",
})
export class ShipsComponent {
  currentShips: (
    | "aircraft carrier"
    | "battleship"
    | "cruiser"
    | "destroyer"
    | "sub"
  )[] = [
    "aircraft carrier",
    "battleship",
    "cruiser",
    "destroyer",
    "sub",
    "sub",
  ];
  draggingService = inject(DraggingService);
}
