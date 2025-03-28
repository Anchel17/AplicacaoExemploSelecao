import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const dataNoFuturoValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dataSelecionada = new Date(control.value);
  const hoje = new Date();

  return dataSelecionada > hoje ? {dataFutura: true} : null;
}
