import { effect, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DraggingService {
  isDragging = signal(false);
  draggedElement!: HTMLElement;

  constructor() {}
}
