import { FieldBase } from './field-base';

export class FieldDropDown extends FieldBase<string> {
    controlType = 'dropdown'

    constructor(options: {} = {}){
        super(options);
        this.matField = true
    }
}
