import { AbstractControl } from '@angular/forms';
import Utils from '../modules/utils';

export function cellphoneValidator(control: AbstractControl) {
    if ( control.value !== '' ) {
        if (!(/^\([1-9]\d\)\s9?\d{4}-\d{4}$/.test( Utils.Mask(control.value, '(99) 99999-9999') ))) {
            return {invalid_cellphone: true }
        }
    }

    return null
}