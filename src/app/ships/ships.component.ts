import { Component, inject } from "@angular/core";
import { AddDragDirective } from "../directives/add-drag/add-drag.directive";
import { DraggingService } from "../services/dragging/dragging.service";
import { GameStateService } from "../services/dragging/game-state/game-state.service";

@Component({
  selector: "ships",
  standalone: true,
  imports: [AddDragDirective],
  templateUrl: "./ships.component.html",
})
export class ShipsComponent {
  draggingService = inject(DraggingService);
  gameStateService = inject(GameStateService);
}
