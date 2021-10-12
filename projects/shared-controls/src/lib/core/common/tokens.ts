import { InjectionToken, NgModuleFactory, Type } from '@angular/core';

export declare interface ModuleType { name: string ; loadChildren: () => Promise<NgModuleFactory<any> | Type<any>>; }
export const LAZY_MODULES = new InjectionToken<{ [key: string]: string }>('LAZY_MODULES');
export const EXTERNAL_LAZY_MODULES = new InjectionToken<{ [key: string]: string }>('EXTERNAL_LAZY_MODULES');

