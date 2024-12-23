import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCellComponent } from './board-cell.component';

describe('BoardCellComponent', () => {
  let component: BoardCellComponent;
  let fixture: ComponentFixture<BoardCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
