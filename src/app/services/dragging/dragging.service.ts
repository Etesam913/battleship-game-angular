import { Injectable, signal } from "@angular/core";
import { Ship, ShipTypes } from "../../app.component";

@Injectable({
  providedIn: "root",
})
export class DraggingService {
  isDragging = signal(false);
  draggedElement!: HTMLElement;
  shipObject = signal<Ship | null>(null);

  getShipWidthFromType(shipType: ShipTypes): number {
    switch (shipType) {
      case "aircraft carrier":
        return 5;
      case "battleship":
        return 4;
      case "cruiser":
        return 3;
      case "destroyer":
        return 2;
      case "sub":
        return 1;
      default:
        throw new Error("Unknown ship type");
    }
  }

  constructor() {}
}
