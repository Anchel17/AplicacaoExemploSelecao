import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaFuncionariosComponent } from './tabela-funcionarios.component';

describe('TabelaFuncionariosComponent', () => {
  let component: TabelaFuncionariosComponent;
  let fixture: ComponentFixture<TabelaFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaFuncionariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
