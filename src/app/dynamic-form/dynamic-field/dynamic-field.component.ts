import { DomSanitizer } from '@angular/platform-browser'
import { FormGroup, FormControl } from '@angular/forms'
import { FieldBase } from '../field-base'
import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'cmjr-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css']
})
export class DynamicFieldComponent implements OnInit {
  @Input() field: FieldBase<any>
  @Input() form: FormGroup
  hide = true

  /// AutoComplete Control
  autoCompleteControl = new FormControl()
  filteredItems: Observable<string[]>

  ngOnInit() {
    this.filteredItems = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterAutoComplete(value))
      )
  }

  private _filterAutoComplete(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.field.options.filter( item => item.toLowerCase().includes(filterValue))
  }

  constructor(private sanitizer: DomSanitizer) {}

  get hasHint() {
    return this.field.hint !== ''
  }

  get isValid() {
    return this.form.controls[this.field.key].valid
  }

  get error(){
    let control = this.form.controls[this.field.key]
    let message = 'Campo com <strong>valor inesperado</strong>'

    if (control) {
      message = ( control.hasError('required') ? `O campo ${this.field.fieldName} <strong>é obrigatório</strong>` :
        control.hasError('email') ? 'Informe um <strong>email válido</strong>' :
        control.hasError('minlength') ? `Campo deve ter <strong>mais de ${this.field.minLength} caracteres</strong>` :
        control.hasError('maxlength') ? `Campo deve ter <strong>até ${this.field.maxLength} caracteres</strong>` :
        control.hasError('min') || control.hasError('max') ? `Inform um valor <strong>entre ${this.field.min} e ${this.field.max}</strong>` :
        control.hasError('pattern') ? `Informe um <strong>${this.field.fieldName} válido</strong>` :
        control.hasError('passwordsNotMatch') ? 'As senhas não conferem' :
        control.hasError('alreadyExists') ? `Este <strong>${this.field.fieldName}</strong> ja está em uso.` : '' )
    }

    return this.sanitizer.bypassSecurityTrustHtml(message)
  }

  get hint() {
    return this.sanitizer.bypassSecurityTrustHtml(this.field.hint)
  }
}
