import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'cmjr-chips-auto-complete',
  templateUrl: './chips-auto-complete.component.html',
  styleUrls: ['./chips-auto-complete.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ChipsAutoCompleteComponent,
    multi: true
  }]
})
export class ChipsAutoCompleteComponent implements AfterViewInit, ControlValueAccessor {
  @Input() label: string
  @Input() autoCompleteList: any[]
  @Input() listKey: string
  @Input() listValue: string

  firstElement: any
  @Input() set firstIsAll(value: boolean) {
    if ( value === true ) {
      this.firstElement = this.autoCompleteList[0][this.listValue]
    }
  }

  @ViewChild('itemInput', {static: true}) itemInput: ElementRef

  visible = true
  selectable = true
  removable = true
  addOnBlur = false
  separatorKeyCodes: number[] = [ENTER, COMMA]
  itemControl = new FormControl()
  filteredItems: Observable<any[]>
  value: any[]

  constructor() {
    this.value = []
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.filteredItems = this.itemControl.valueChanges.pipe(
        startWith(null),
        map( (item: any | null) => item ? this._filter(item) : this.autoCompleteList.slice())
      )  
    });
  }

  private propagateChange = (_: any) => {}

  private onChange(event) {
    this.propagateChange(this.value)
  }
  
  writeValue(value): void {
    if ( value ) {
      this.value = value
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void { }
  
  setDisabledState?(isDisabled: boolean): void { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()
    return this.autoCompleteList.filter(
      item => item[this.listKey].toLowerCase().indexOf(filterValue) === 0)    
  }

  add(event: MatChipInputEvent) {
    const input = event.input
    const value = event.value

    if ( input ) {
      input.value = ''
    }

    this.itemControl.setValue
    this.onChange(value)
  }

  remove(item: string) {
    const index = this.value.indexOf(item)
    
    if ( this.firstElement && item === this.firstElement ) {
      this.itemControl.enable()
    }

    if ( index >= 0 ) {
      this.value.splice(index, 1)
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    if ( this.firstElement && event.option.value === this.firstElement ) {
      this.itemControl.disable()
      this.value = []
    }

    this.value.push(event.option.value)
    this.itemInput.nativeElement.value = ''
    this.itemControl.setValue(null)
    this.onChange(this.value)
  }

  getItemList(key) {
    let index = this.autoCompleteList.findIndex( item => item[this.listValue] === key )
    
    let val = this.autoCompleteList[index]
    return val[this.listKey]
  }
}