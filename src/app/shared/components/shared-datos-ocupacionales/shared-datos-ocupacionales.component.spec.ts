import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDatosOcupacionalesComponent } from './shared-datos-ocupacionales.component';

describe('SharedDatosOcupacionalesComponent', () => {
  let component: SharedDatosOcupacionalesComponent;
  let fixture: ComponentFixture<SharedDatosOcupacionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedDatosOcupacionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDatosOcupacionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
