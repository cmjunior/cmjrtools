import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'fixnumber'
})
export class FixedNumberPipe implements PipeTransform {
    transform(value: any, digits: number = 2): any {
        if ( !value || isNaN(value) ) {
            return value
        }
        
        return <Number>value.toFixed(digits)
    }
}