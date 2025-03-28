import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const salarioPositivoValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const salario = control.value;

  return salario < 0 ? {salarioNegativo: true} : null;
}
