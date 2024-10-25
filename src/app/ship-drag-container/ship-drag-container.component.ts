import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from "@angular/core";
import { DraggingService } from "../dragging.service";

@Component({
  selector: "ship-drag-container",
  standalone: true,
  imports: [],
  templateUrl: "./ship-drag-container.component.html",
})
export class ShipDragContainerComponent implements AfterViewInit {
  @Input() shipType!: string;
  @ViewChild("container") container!: ElementRef;
  draggingService = inject(DraggingService);
  defaultRect!: DOMRect;

  ngAfterViewInit(): void {
    const containerElement = this.container.nativeElement as HTMLElement;
    this.defaultRect = containerElement.getBoundingClientRect();
  }

  onMouseDown(event: MouseEvent) {
    const containerElement = this.container.nativeElement as HTMLElement;
    // containerElement.style.position = "absolute";
    this.draggingService.onMouseDown(containerElement, this.defaultRect);
  }
}
