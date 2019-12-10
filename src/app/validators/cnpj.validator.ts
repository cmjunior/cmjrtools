import { AbstractControl } from '@angular/forms';
import Utils from '../modules/utils';

export function cnpjValidator(control: AbstractControl) {
    if ( control.value !== '' && ! Utils.IsCGCValid(control.value) ) {
        return {invalid_cnpj: true}
    }

    return null
}