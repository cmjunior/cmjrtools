import { FieldControlService } from '../field-control.service';
import { FormGroup } from '@angular/forms';
import { FieldBase } from '../field-base';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cmjr-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, AfterViewInit {
  @Input() needCreateForm: boolean
  @Input() form: FormGroup
  @Input() fields: FieldBase<any>[] = []
  @Input() formTitle: string
  @Input() showActions: boolean
  
  @Output() submitEvent = new EventEmitter<any>();

  payload = ''

  public cols: Observable<number>

  constructor(private fcs: FieldControlService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    let start: number;

    if ( this.needCreateForm ) {
      this.form = this.fcs.toFormGroup(this.fields)
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onSubmit(object: any) {
    this.submitEvent.emit(this.form)
  }
}
