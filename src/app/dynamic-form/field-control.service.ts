import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FieldBase } from './field-base';
import { Injectable } from '@angular/core';

@Injectable()
export class FieldControlService {
    constructor(){}

    toFormGroup(fields: FieldBase<any>[]){
        let group: any = {}
        let validators: ValidatorFn[]

        fields.forEach(field => {
            validators = []
            if (field.required) validators.push(Validators.required)
            if (field.pattern) validators.push(Validators.pattern(field.pattern))
            if (field.minLength !== -1) validators.push(Validators.minLength(field.minLength))
            if (field.maxLength !== -1) validators.push(Validators.maxLength(field.maxLength))
            if (field.min !== -1) validators.push(Validators.min(field.min))
            if (field.max !== -1) validators.push(Validators.max(field.max))
            if (field.email) validators.push(Validators.email)

            group[field.key] = validators.length > 0 ?
                new FormControl(field.value || '', validators ) :
                new FormControl(field.value || '' )
        });

        return new FormGroup(group)
    }
}
