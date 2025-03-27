import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioModalComponent } from './funcionario-modal.component';

describe('FuncionarioModalComponent', () => {
  let component: FuncionarioModalComponent;
  let fixture: ComponentFixture<FuncionarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
