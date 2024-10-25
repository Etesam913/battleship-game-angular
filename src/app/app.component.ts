import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { BoardComponent } from "./board/board.component";
import { ShipsComponent } from "./ships/ships.component";

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

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, BoardComponent, ShipsComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "battleship-game-angular";

  currentShips = signal<Ship[]>([
    { id: "1", type: "aircraft carrier" },
    { id: "2", type: "battleship" },
    { id: "3", type: "cruiser" },
    { id: "4", type: "destroyer" },
    { id: "5", type: "sub" },
    { id: "6", type: "sub" },
  ]);
}
