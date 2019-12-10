import { Pipe, PipeTransform } from '@angular/core';

var VMasker = require('vanilla-masker')

@Pipe({
  name: 'cgcmask'
})
export class CgcMaskPipe implements PipeTransform {

  transform(value: string): string {
    if ( value ) {
      const text = value.replace(/[_\W]+/g,'')
      const mask = text.length < 12 ? '999.999.999-99' : '99.999.999/9999-99'
  
      return VMasker.toPattern(text, mask);
    }

    return ''
  }
}
