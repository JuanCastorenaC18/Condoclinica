import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsultasComponent } from './form-consultas.component';

describe('FormConsultasComponent', () => {
  let component: FormConsultasComponent;
  let fixture: ComponentFixture<FormConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
