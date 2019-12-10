import { FieldBase } from './field-base';

export class FieldDatePicker extends FieldBase<string> {
    controlType = 'datePicker'
    type: string

    constructor(options: {} = {}){
        super(options);
        this.type = options['type'] || ''
        this.matField = true
    }
}