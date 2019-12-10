export class FieldBase<T>{
    value: T
    key: string
    label: string
    required: boolean
    minLength: number
    maxLength: number
    min: number
    max: number
    pattern: string
    order: number
    controlType: string
    columns: number
    hint: string
    matField: boolean
    mask: string
    email: boolean
    password: boolean
    appearance: string
    fullWidth: boolean
    fieldName: string
    options: any[]
    type: any

    constructor( options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        minLength?: number,
        maxLength?: number,
        min?: number,
        max?: number,
        pattern?: string,
        order?: number,
        controlType?: string,
        columns?: number,
        hint?: string,
        matField?: boolean,
        mask?: string,
        email?: boolean,
        password?: boolean,
        appearance?: string,
        fullWidth?: boolean,
        fieldName?: string,
        options?: any[],
        type?: string
    } = {}){
        this.value = options.value
        this.key = options.key || ''
        this.label = options.label || ''
        this.required = !!options.required
        this.minLength = options.minLength || -1
        this.maxLength = options.minLength || -1
        this.min = options.min || -1
        this.max = options.max || -1
        this.pattern = options.pattern || ''
        this.order = options.order === undefined ? 1 : options.order
        this.controlType = options.controlType || ''
        this.columns = options.columns || 1
        this.hint = options.hint || ''
        this.matField = options.matField === undefined ? false : options.matField
        this.mask = options.mask || ''
        this.email = options.email === undefined ? false : options.email
        this.password = options.password === undefined ? false : options.password
        this.appearance = options.appearance || 'legacy'
        this.fullWidth = options.fullWidth === undefined ? true : options.fullWidth
        this.fieldName = options.fieldName || options.key
        this.options = options.options || []
        this.type = options.type || 'text'
    }
}
