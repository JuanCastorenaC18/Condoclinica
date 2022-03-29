import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEspecialidadesComponent } from './form-especialidades.component';

describe('FormEspecialidadesComponent', () => {
  let component: FormEspecialidadesComponent;
  let fixture: ComponentFixture<FormEspecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEspecialidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
