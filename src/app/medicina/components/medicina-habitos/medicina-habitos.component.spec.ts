import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaHabitosComponent } from './medicina-habitos.component';

describe('MedicinaHabitosComponent', () => {
  let component: MedicinaHabitosComponent;
  let fixture: ComponentFixture<MedicinaHabitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinaHabitosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaHabitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
