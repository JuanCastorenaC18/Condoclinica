import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTratamientosComponent } from './form-tratamientos.component';

describe('FormTratamientosComponent', () => {
  let component: FormTratamientosComponent;
  let fixture: ComponentFixture<FormTratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTratamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
