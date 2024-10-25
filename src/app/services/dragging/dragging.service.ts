import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DraggingService {
  isDragging = signal(false);
  draggedElement = signal<null | HTMLElement>(null);

  constructor() {}
}
