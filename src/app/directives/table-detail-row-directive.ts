import { Directive, TemplateRef, HostBinding, Input, Output, EventEmitter, HostListener, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[tableDetailRow]'
})
export class TableDetailRowDirective {
    private row: any
    private templateRef: TemplateRef<any>
    private opened: boolean

    @HostBinding('class.expanded')
    get expanded(): boolean {
        return this.opened
    }

    @Input()
    set tableDetailRow(value: any) {
        if ( value !== this.row ) {
            this.row = value
        }
    }

    @Input('tableDetailRowTemplate')
    set template(value: TemplateRef<any>) {
        if ( value !== this.templateRef ) {
            this.templateRef = value
        }
    }

    @Output() 
    toggleChange = new EventEmitter<TableDetailRowDirective>()

    constructor(public viewContainerRef: ViewContainerRef) {}

    @HostListener('click')
    onclick() {
        this.toggle()
    }

    toggle() {
        if ( this.opened ) {
            this.viewContainerRef.clear()
        } else {
            this.render()
        }
        this.opened = this.viewContainerRef.length > 0
        this.toggleChange.emit(this)
    }

    private render() {
        this.viewContainerRef.clear()
        if ( this.viewContainerRef && this.row ) {
            this.viewContainerRef.createEmbeddedView(this.templateRef, {
                $implicit: this.row
            })
        }
    }
}