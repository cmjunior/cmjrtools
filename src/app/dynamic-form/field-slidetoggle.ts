import { FieldBase } from './field-base';
export class FieldSlideToggle extends FieldBase<boolean> {
    controlType = 'slidetoggle'
    type: boolean

    constructor(options: {} = {}){
        super(options)
        this.value = false
    }
}