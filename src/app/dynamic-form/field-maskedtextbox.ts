import { FieldBase } from './field-base';

export class FieldMaskedTextBox extends FieldBase<string> {
    controlType = 'maskedtextbox'
    type: string

    constructor(options: {} = {}){
        super(options);
        this.type = options['type'] || ''
        this.matField = true
    }
}