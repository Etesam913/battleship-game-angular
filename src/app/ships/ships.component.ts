import { Component } from "@angular/core";
import { AddDragDirective } from "../directives/add-drag/add-drag.directive";

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
}
