import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridSkeltonComponent } from './grid-skelton.component';

describe('GridSkeltonComponent', () => {
  let component: GridSkeltonComponent;
  let fixture: ComponentFixture<GridSkeltonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridSkeltonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridSkeltonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
