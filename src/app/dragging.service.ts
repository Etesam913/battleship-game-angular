import { Injectable, Inject, PLATFORM_ID, signal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class DraggingService {
  private windowRef: Window | null = null;
  isDragging = false;
  draggingElement: null | HTMLElement = null;
  elementRect: null | DOMRect = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowRef = window;
      this.initListeners();
    }
  }

  onMouseDown(element: HTMLElement, defaultRect: DOMRect) {
    this.isDragging = true;
    this.draggingElement = element;
    this.elementRect = defaultRect;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.draggingElement && this.elementRect) {
      this.draggingElement.style.transform = `translate(${event.clientX - this.elementRect.left}px, ${event.clientY - this.elementRect.top}px)`;
    }
  }

  onMouseUp() {
    this.isDragging = false;
    this.elementRect = null;
    this.draggingElement = null;
  }

  private initListeners(): void {
    if (this.windowRef) {
      this.windowRef.addEventListener("mousemove", this.onMouseMove.bind(this));
      this.windowRef.addEventListener("mouseup", this.onMouseUp.bind(this));
    }
  }
}
