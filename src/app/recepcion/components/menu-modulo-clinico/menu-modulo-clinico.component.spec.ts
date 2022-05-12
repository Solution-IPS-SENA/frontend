import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModuloClinicoComponent } from './menu-modulo-clinico.component';

describe('MenuModuloClinicoComponent', () => {
  let component: MenuModuloClinicoComponent;
  let fixture: ComponentFixture<MenuModuloClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuModuloClinicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuModuloClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
