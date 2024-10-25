import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { BoardComponent } from "./board/board.component";
import { ShipsComponent } from "./ships/ships.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, BoardComponent, ShipsComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "battleship-game-angular";
}
