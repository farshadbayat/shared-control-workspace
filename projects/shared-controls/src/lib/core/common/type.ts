import { ElementRef, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

// ||||||||||||||||||||||||||||||||||||||| Layout |||||||||||||||||||||||||||||||||||||||||||||
export class ElementAttribute {
    class?: string[];
    style?: any;
}
export class BSGrid {
    size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'auto';
    device?: 'sm' | 'md' | 'lg' | 'xl';
    offset?: boolean;
}

export class BSContainer extends ElementAttribute {
    id?: string;
    fluid?: boolean;
}

export class BSColumn extends ElementAttribute {
    bootstraps?: BSGrid[];
}

export class BSRow extends ElementAttribute {
    valign?: 'start' | 'center' | 'end';
    halign?: 'start' | 'center' | 'end' | 'around' | 'between';
}

export class Form extends BSContainer {
    name: string;
    title?: string;
    rows: Row[];
}

export class Column extends BSColumn {
    public field: any | any[];
}

export class Row extends BSRow {
    columns?: Column[];
}

export function containerClass(container: BSContainer): string[] {
    return container ? [...(container.class || []), ...[container.fluid ? 'container-fluid' : 'container']] : [];
}

export function columnClass(column: BSColumn): string[] {
    const bs = (column.bootstraps || [{ device: 'sm' }]);
    const responsive = bs.map(r => [r.offset === true ? 'offset' : 'col', r.device , r.size].filter(Boolean).join('-'));
    const fixedColumnClass = ['dm-column'];
    return [...(column.class || []), ...responsive, ...fixedColumnClass];
}

export function rowClass(row: BSRow): string[] {
    return [...(row.class || []),
            ...['row'],
            ...[row.valign ? 'align-items-' + row.valign : null],
            ...[row.halign ? 'justify-content-' + row.halign : null]
        ].filter(Boolean);
}

export function ExtractValue<T>(form: Form): Dictionery<T> {
    const dataForm: Dictionery<any> = {};
    if (form && form.rows) {
        form.rows.forEach( r => {
            r.columns.forEach( c => {
                if (Array.isArray(c.field)) {
                    c.field.forEach( f => {
                        if ( f.self !== null && f.self !== undefined && (f.ioStatus === 'both' || f.ioStatus === 'input') ) {
                            dataForm[f.name] = f.self.value();
                        }
                    });
                } else {
                    if (c.field.self !== null && c.field.self !== undefined &&
                        (c.field.ioStatus === 'both' || c.field.ioStatus === 'input')) {
                        dataForm[c.field.name] = c.field.self.value();
                    }
                }
            });
        });
    }
    return dataForm;
}
// |||||||||||||||||||||||||||||||||||||||||||| |||||||||||||||||||||||||||||||||||||||||||||


export enum InternalTag {
    BottonSheet = 'dm-botton-sheet',
    Button = 'dm-button',
    ButtonToggle = 'dm-button-toggle',
    Checkbox = 'dm-checkbox',
    Chips = 'dm-chips',
    Datepicker = 'dm-datepicker',
    Icon = 'dm-icon',
    Menu = 'dm-menu',
    Progress = 'dm-progress',
    Radio = 'dm-radio',
    Select = 'dm-select',
    Slider = 'dm-slider',
    SlideToggle = 'dm-slide-toggle',
    Input = 'dm-input',
    Label = 'dm-label',
    Grid = 'dm-grid',
    Tab = 'dm-tab',
    Upload = 'dm-upload',
    Empty = 'dm-empty',
}

export enum FieldTagType {
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week'
}

export enum ButtonAppearance {
    'mat-button',
    'mat-raised-button',
    'mat-flat-button',
    'mat-stroked-button',
    'mat-icon-button',
    'mat-fab',
    'mat-mini-fab'
}
// ||||||||||||||||||||||||||||||||||||||| Validation |||||||||||||||||||||||||||||||||||||||||||||

export declare type ValidatorType = 'required' | 'requiredTrue' | 'email' | 'nullValidator' | { 'pattern': string} |
                                {'min': number} | {'max': number} | { 'minLength': number} | { 'maxLength': number};
export enum ValidationStatus {
    None = 0,
    Validation = 1,
}

export const ValidatorList = {
    min: {validator: (...args) => Validators.min(args[0]), isParam: true},
    max: {validator: (...args) => Validators.max(args[0]), isParam: true},
    minLength: {validator: (...args) => Validators.minLength(args[0]), isParam: true},
    maxLength: {validator: (...args) => Validators.maxLength(args[0]), isParam: true},
    pattern: {validator: (...args) => Validators.pattern(args[0]), isParam: true},
    required: {validator: (...args) => Validators.required, isParam: false},
    requiredTrue: {validator: (...args) => Validators.requiredTrue, isParam: false},
    email: {validator: (...args) => Validators.email, isParam: false},
    nullValidator: {validator: (...args) => Validators.nullValidator, isParam: false}
};

export const ValidatorNameList = Object.keys(ValidatorList).map( name => name.toLowerCase());

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// ||||||||||||||||||||||||||||||||||||||| Datastructure |||||||||||||||||||||||||||||||||||||||||

export declare interface Dictionery<T> { [key: string]: T; }

//SearchableDataList => SearchableDataSource
export interface ISearchableDataSource<T> extends IDataSource<T> {
    callbackSearch?: (text: any) => void;
    onlyExist?: boolean;
}

// DataList => DataSource
export interface IDataSource<T> {
    keyFieldName?: string;
    displayFieldName: string;
    list: T[] | any[];
}

export function getEnumValues(e: any): string[] {
    return Object.keys(e).map((i) => e[i]);
}

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// |||||||||||||||||||||||||||||||||||||| Fields |||||||||||||||||||||||||||||||||||||||||||||||||

export declare type EventType = 'click' | 'change' | 'filter' | 'checked' | 'setting change' | 'selected' | 'upload' | 'crop' | 'delete';

export interface FieldEvent<T> {
    sender: T;
    value?: any;
    event?: EventType;
}

export interface IField<T> {
    validationStatus: ValidationStatus;
    option: any;
    event: EventEmitter<FieldEvent<T>>;
    // readonly classes: string;
    formControl: FormControl;
    onUpdateValue(value: T, eventType: EventType): void;
    onOptionChanged(option: any): void;
    value(): any;
}

export interface IOption extends BSColumn {
    self?: any;
    name: string;
    tagName: InternalTag;
    label?: string;
    disabled?: boolean;
    visible?: boolean;
    value?: any | undefined; // if value is undefined there is not return value
    validation?: ValidatorType[];
    attrs?: Dictionery<string | number | boolean>[];
    ioStatus?: 'none' | 'input' | 'output' | 'both'; // input: value put in json, output: event enable
    isDesignMode?: boolean;
    fieldStatus?: FieldStatus;
    updateModel?: () => void;
}
// TODO Raise event after field status change to form
export  declare type FieldStatus = 'Ready' | 'OnInit' | 'OnCreate' | 'Error';
export declare type FormMode = 'designer' | 'view';


/**
 * clone object but refrence variable not change
 */
export function deepClone<T>(obj: any) {
    if ( obj === null || obj === undefined) {
      return obj;
    } else if ( Array.isArray(obj)) {
      const array: T[] = [];
      obj.forEach( item => array.push( deepClone<typeof item>(item) ));
      return array as T[];
    } else {
      const c = Object.assign({} as T, obj);
      const fields: string[] = Object.getOwnPropertyNames(obj);
      fields.forEach( f => {
        const field = obj[f];
        if ( typeof field === 'object' ) {
          c[f] = deepClone<typeof field>(field);
        }
      });
      return c;
    }
}

