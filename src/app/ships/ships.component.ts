import { Component, inject, Input } from "@angular/core";
import { AddDragDirective } from "../directives/add-drag/add-drag.directive";
import { DraggingService } from "../services/dragging/dragging.service";
import { Ship } from "../app.component";

@Component({
  selector: "ships",
  standalone: true,
  imports: [AddDragDirective],
  templateUrl: "./ships.component.html",
})
export class ShipsComponent {
  @Input({ required: true }) currentShips!: Ship[];
  draggingService = inject(DraggingService);
}
