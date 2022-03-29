import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAseguradoraComponent } from './form-aseguradora.component';

describe('FormAseguradoraComponent', () => {
  let component: FormAseguradoraComponent;
  let fixture: ComponentFixture<FormAseguradoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAseguradoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAseguradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
