import { Component } from "@angular/core";
import { ShipDragContainerComponent } from "../ship-drag-container/ship-drag-container.component";
import { AddDragDirective } from "../add-drag.directive";

@Component({
  selector: "ships",
  standalone: true,
  imports: [ShipDragContainerComponent, AddDragDirective],
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
}
