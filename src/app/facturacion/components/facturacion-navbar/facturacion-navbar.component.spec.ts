import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionNavbarComponent } from './facturacion-navbar.component';

describe('FacturacionNavbarComponent', () => {
  let component: FacturacionNavbarComponent;
  let fixture: ComponentFixture<FacturacionNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturacionNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
