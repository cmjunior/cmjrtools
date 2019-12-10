import { FieldBase } from './field-base';

export class FieldTextBox extends FieldBase<string> {
    controlType = 'textbox'
    type: string

    constructor(options: {} = {}){
        super(options);
        this.type = options['type'] || ''
        this.matField = options['matField'] !== undefined ? options['matField'] : true
    }
}