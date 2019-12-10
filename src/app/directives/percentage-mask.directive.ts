import { Directive, ElementRef, Renderer2 } from '@angular/core';

var VMasker = require('vanilla-masker')

@Directive({
  selector: '[percentage-mask]'
})
export class PercentageMaskDirective {
  public nativeElement: HTMLInputElement

  constructor(public element: ElementRef, public render: Renderer2) {
    this.nativeElement = this.element.nativeElement
    
    this.render.listen(this.nativeElement, 'keyup', () => {
      VMasker(this.nativeElement).maskMoney({
        precision: 2,
        separator: '.',
      })
    })
  }

}
