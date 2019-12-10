import { FieldBase } from "./field-base";

export class FieldCheckBox extends FieldBase<boolean> {
  controlType = 'checkbox'
  type: boolean

  constructor(options: {} = []) {
    super(options)
    this.value = false
  }
}
