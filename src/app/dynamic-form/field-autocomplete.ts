import { FieldBase } from "./field-base"

export class FieldAutoComplete extends FieldBase<string> {
  controlType = 'autocomplete'

  constructor(options: {} = {}) {
    super(options)
    this.matField = true
  }
}
