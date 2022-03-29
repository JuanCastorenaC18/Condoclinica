import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClinicasComponent } from './form-clinicas.component';

describe('FormClinicasComponent', () => {
  let component: FormClinicasComponent;
  let fixture: ComponentFixture<FormClinicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClinicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
