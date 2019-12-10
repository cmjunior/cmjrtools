import { Pipe, PipeTransform } from '@angular/core';
import Utils from '../modules/utils';

@Pipe({
    name: 'maskfield'
})
export class MaskFieldPipe implements PipeTransform {

    transform(value: string, mask: string): string {
        if ( value ) {
            const text = Utils.OnlyNumber(value)
            return Utils.Mask(text, mask);
        }

        return ''
    }
}