import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
type anexo = {
    valor: string,
    nombre: string
}
export function inAnexoValidator(anexos: anexo[]): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {

        let anexo = anexos.map((el: anexo) => el.valor)

        const value = control.value

        if (!value){
            return null;
        }

        return !anexo.includes(value) ? {inAnexo: true} : null;
    }
}
