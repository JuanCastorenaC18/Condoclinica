import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMedicosComponent } from './form-medicos.component';

describe('FormMedicosComponent', () => {
  let component: FormMedicosComponent;
  let fixture: ComponentFixture<FormMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMedicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
