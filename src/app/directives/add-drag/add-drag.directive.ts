import {
  Directive,
  effect,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
} from "@angular/core";
import { DraggingService } from "../../services/dragging/dragging.service";

@Directive({
  selector: "[addDrag]",
  standalone: true,
})
export class AddDragDirective implements OnInit, OnDestroy {
  private mouseX = signal<number | null>(null);
  private mouseY = signal<number | null>(null);
  private directiveElement!: HTMLElement;
  private directiveElementRect!: DOMRect;
  private handle!: HTMLElement;

  private mouseDownListener: (() => void) | null = null;
  private mouseMoveListener: (() => void) | null = null;
  private mouseUpListener: (() => void) | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private draggingService: DraggingService,
  ) {
    this.directiveElement = this.el.nativeElement;
    this.draggingService.draggedElement = this.directiveElement;
    effect(() => {
      const isMouseXSet = this.mouseX() !== null;
      const isMouseYSet = this.mouseY() !== null;
      const mouseX = this.mouseX();
      const mouseY = this.mouseY();
      if (this.draggingService.isDragging()) {
        const { left, top } = this.directiveElementRect;
        if (mouseX && mouseY) {
          this.renderer.setStyle(
            this.directiveElement,
            "transform",
            `translate(${isMouseXSet ? mouseX - left : 0}px,${isMouseYSet ? mouseY - top : 0}px)`,
          );
        }
      }
    });
  }

  ngOnInit(): void {
    const potentialHandle = this.directiveElement.querySelector(
      ".handle",
    ) as HTMLElement;
    this.handle = potentialHandle ?? this.directiveElement;
    this.directiveElementRect = this.directiveElement.getBoundingClientRect();

    this.mouseDownListener = this.renderer.listen(
      this.handle,
      "mousedown",
      this.onMouseDown.bind(this),
    );
  }

  private onMouseDown() {
    this.draggingService.isDragging.set(true);
    this.mouseMoveListener = this.renderer.listen(
      "window",
      "mousemove",
      this.onMouseMove.bind(this),
    );

    this.mouseUpListener = this.renderer.listen(
      "window",
      "mouseup",
      this.onMouseUp.bind(this),
    );
  }

  private onMouseMove(event: MouseEvent) {
    if (this.draggingService.isDragging()) {
      this.mouseX.set(event.clientX);
      this.mouseY.set(event.clientY);
    }
  }

  private onMouseUp() {
    this.draggingService.isDragging.set(false);

    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }

    if (this.mouseUpListener) {
      this.mouseUpListener();
    }
  }

  ngOnDestroy(): void {
    if (this.mouseDownListener) {
      this.mouseDownListener();
    }
  }
}
