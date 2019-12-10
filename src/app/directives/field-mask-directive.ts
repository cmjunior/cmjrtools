import { Directive, ElementRef, Renderer2, Input } from "@angular/core";

var VMasker = require('vanilla-masker')

@Directive({
    selector: '[field-mask]'
})
export class FieldMask {
    @Input('mask') mask: string
    public nativeElement: HTMLInputElement

    constructor(public element: ElementRef, public render: Renderer2) {
        this.nativeElement = this.element.nativeElement

        this.render.listen(this.nativeElement, 'keyup', () => {
            VMasker(this.nativeElement).maskPattern(this.mask)
        })
    }
}