import {
  AfterViewInit,
  Directive,
  effect,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
} from "@angular/core";
import { DraggingService } from "../../services/dragging/dragging.service";
import {
  GameStateService,
  Ship,
} from "../../services/dragging/game-state/game-state.service";

@Directive({
  selector: "[addDrag]",
  standalone: true,
})
export class AddDragDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input({ required: true }) shipObject!: Ship;
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
    private gameStateService: GameStateService,
  ) {
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

    effect(() => {
      this.gameStateService.currentShips();
      if (this.directiveElement) {
        this.directiveElementRect =
          this.directiveElement.getBoundingClientRect();
      }
    });
  }

  ngAfterViewInit(): void {
    // The if statement fixes a weird type error where getBoundingClientRect did not exist
    if (this.directiveElement.getBoundingClientRect) {
      this.directiveElementRect = this.directiveElement.getBoundingClientRect();
    }
  }

  ngOnInit(): void {
    this.directiveElement = this.el.nativeElement;
    this.draggingService.draggedElement = this.directiveElement;
    const potentialHandle = this.directiveElement.querySelector(
      ".handle",
    ) as HTMLElement;
    this.handle = potentialHandle ?? this.directiveElement;

    this.mouseDownListener = this.renderer.listen(
      this.handle,
      "mousedown",
      this.onMouseDown.bind(this),
    );
  }

  private onMouseDown() {
    this.draggingService.isDragging.set(true);
    this.draggingService.shipObject.set(this.shipObject);
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
