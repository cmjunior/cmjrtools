import { FieldBase } from './field-base';

export class FieldRadioButton extends FieldBase<string> {
    controlType = 'radiobutton'

    constructor(options: {} = {}){
        super(options);
    }
}
