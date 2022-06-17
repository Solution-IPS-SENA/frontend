import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaDatosOcupacionalesComponent } from './medicina-datos-ocupacionales.component';

describe('MedicinaDatosOcupacionalesComponent', () => {
  let component: MedicinaDatosOcupacionalesComponent;
  let fixture: ComponentFixture<MedicinaDatosOcupacionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinaDatosOcupacionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaDatosOcupacionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
