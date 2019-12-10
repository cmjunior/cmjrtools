import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function dateValidator(control: AbstractControl) {
    if ( control.value !== '' ) {
        const val = moment(control.value, 'DD/MM/YYYY', true)

        if (! val.isValid() ) {
            return {invalid_date: true }
        }
    }

    return null
}