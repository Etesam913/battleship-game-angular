import { Injectable, signal } from "@angular/core";

export type ShipTypes =
  | "aircraft carrier"
  | "battleship"
  | "cruiser"
  | "destroyer"
  | "sub";

export type Ship = {
  id: string;
  type: ShipTypes;
};

@Injectable({
  providedIn: "root",
})
export class GameStateService {
  currentShips = signal<Ship[]>([
    { id: "1", type: "aircraft carrier" },
    { id: "2", type: "battleship" },
    { id: "3", type: "cruiser" },
    { id: "4", type: "destroyer" },
    { id: "5", type: "sub" },
    { id: "6", type: "sub" },
  ]);

  constructor() {}
}
