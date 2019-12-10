import { Directive, ElementRef, Renderer2 } from "@angular/core";

var VMasker = require('vanilla-masker')

@Directive({
    selector: '[telephone-mask]'
})
export class TelephoneMaskDirective {
    public nativeElement: HTMLInputElement

    constructor(public element: ElementRef, public render: Renderer2) {
        this.nativeElement = this.element.nativeElement

        this.render.listen(this.nativeElement, 'keyup', () => {
            const text = this.nativeElement.value.replace(/[_\W]+/g,'')
            const mask = text.length < 11 ? '(99) 9999-9999?9' : '(99) 9 9999-9999';

            VMasker(this.nativeElement).maskPattern(mask)
        })
    }
}