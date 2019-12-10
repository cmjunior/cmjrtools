import { FieldBase } from './field-base';

export class FieldTextArea extends FieldBase<string> {
    controlType = 'textarea'
    type: string

    constructor(options: {} = {}){
        super(options)
        this.type = options['type'] || ''
        this.matField = true
    }
}