import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaRevisionSistemasComponent } from './medicina-revision-sistemas.component';

describe('FormRevisionSistemasMedicinaComponent', () => {
  let component: MedicinaRevisionSistemasComponent;
  let fixture: ComponentFixture<MedicinaRevisionSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinaRevisionSistemasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaRevisionSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
