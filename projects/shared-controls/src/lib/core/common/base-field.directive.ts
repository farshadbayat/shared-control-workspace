import { AfterViewInit, ElementRef, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Directive } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { EventType, FieldEvent, IField, IOption, ValidationStatus, ValidatorList, ValidatorNameList } from './type';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[base-field]'
})
export class BaseFieldDirective<T extends IOption> implements AfterViewInit, IField<T> {
  @ViewChild('input', { static: false }) fieldRef: ElementRef;

  constructor() {
    this.event = new EventEmitter<FieldEvent<T>>();
  }

  protected currentOption: T;
  public validationStatus: ValidationStatus;
  @Input()
  public get option(): T {
        return this.currentOption;
    }
  public set option(value: T) {
    if(value) {
      this.currentOption = value;
      this.currentOption.self = this;
      this.currentOption.updateModel = () => this.onOptionChanged(this.currentOption);
      this.onOptionChanged(value);
    }
  }

  @Output()
  public event: EventEmitter<FieldEvent<T>>;
  public formControl: FormControl;

  onUpdateValue(value: T, eventType: EventType): void {
    this.option.value = value; // || this.option.value;
    this.event.emit({ sender: this.option, value: this.option.value, event: eventType });
  }

  onOptionChanged(option: T): void {
    // tslint:disable-next-line: no-bitwise
    const validation = (ValidationStatus.Validation | this.validationStatus) === ValidationStatus.Validation;
    if (validation) {
            const validators: ValidatorFn[] = [];
            (option.validation || []).forEach(v => {
                if (typeof v === 'string' && ValidatorNameList.indexOf(v.toString().toLowerCase())) {
                    if (ValidatorList[v].isParam) {
                        validators.push(ValidatorList[v].validator(option.value));
                    } else {
                        validators.push(ValidatorList[v].validator());
                    }
                }
            });
            this.formControl = new FormControl({ value: option.value, disabled: option.disabled }, validators);
            this.formControl.valueChanges.subscribe(val => this.onUpdateValue(val, 'change'));
        }
  }

  value() {
    return this.option.value;
  }

  ngAfterViewInit(): void {
    this.updateAttributes();
  }

  updateAttributes() {
    if ( this.option !== null && this.option !== undefined ) {
      (this.option.attrs || []).forEach( attr => {
        const key = Object.keys(attr)[0];
        this.fieldRef.nativeElement.setAttribute(key, attr[key]);
      });
    }
  }
}
