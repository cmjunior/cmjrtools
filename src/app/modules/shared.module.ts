import { NgModule, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import br from '@angular/common/locales/pt';
import { MaterialModule } from './material.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { DataTableComponent } from '../data-table/data-table.component';
import { CgcMaskPipe } from '../pipes/cgc-mask.pipe';
import { FixedNumberPipe } from '../pipes/fixed-number.pipe';
import { ListFilterPipe } from '../pipes/list-filter.pipe';
import { MaskFieldPipe } from '../pipes/mask-field.pipe';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { TableDetailRowDirective } from '../directives/table-detail-row-directive';
import { TelephoneMaskDirective } from '../directives/telephone-mask-directive';
import { CurrencyPipe } from '../pipes/currency.pipe';
import { FieldMask } from '../directives/field-mask-directive';
import { MoneyMaskDirective } from '../directives/money-mask.directive';
import { PercentageMaskDirective } from '../directives/percentage-mask.directive';
import { ChipsAutoCompleteComponent } from '../chips-auto-complete/chips-auto-complete.component';
import { FileUploadComponent } from '../upload-xml/file-upload.component';
import { DynamicFieldComponent } from '../dynamic-form/dynamic-field/dynamic-field.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form/dynamic-form.component';
import { FileDropDirective } from '../directives/file-drop.directive';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

registerLocaleData(br, 'pt-BR');

@NgModule({
  declarations: [
    CgcMaskPipe,    
    ChipsAutoCompleteComponent,
    CurrencyPipe,
    DataTableComponent,
    DynamicFieldComponent,
    DynamicFormComponent,
    FieldMask,
    FileDropDirective,
    FileUploadComponent,
    FixedNumberPipe,
    ListFilterPipe,
    MaskFieldPipe,
    MoneyMaskDirective,
    PercentageMaskDirective,
    SafeHtmlPipe,
    TableDetailRowDirective,
    TelephoneMaskDirective
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
  ],
  exports: [
    CgcMaskPipe,
    ChipsAutoCompleteComponent,
    CurrencyPipe,
    DataTableComponent,
    DynamicFieldComponent,
    DynamicFormComponent,
    FieldMask,
    FileDropDirective,
    FileUploadComponent,
    FixedNumberPipe,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ListFilterPipe,
    MaskFieldPipe,
    MaterialModule,
    MoneyMaskDirective,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PercentageMaskDirective,
    ReactiveFormsModule,
    SafeHtmlPipe,
    TableDetailRowDirective,
    TelephoneMaskDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true},
        {provide: LOCALE_ID, useValue: 'pt-BR'},
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
        // {provide: MatPaginatorIntl, useValue: getPtBRPaginatorIntl() }
      ]
    }
  }
}
