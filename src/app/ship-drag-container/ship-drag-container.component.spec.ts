import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipDragContainerComponent } from './ship-drag-container.component';

describe('ShipDragContainerComponent', () => {
  let component: ShipDragContainerComponent;
  let fixture: ComponentFixture<ShipDragContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipDragContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipDragContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
