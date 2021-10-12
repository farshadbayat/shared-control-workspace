import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModuleType } from '../common/tokens';
import { FormMode } from '../common/type';



@Injectable({
  providedIn: 'root',
})
export class FormService {
  formMode$: BehaviorSubject<FormMode> = new BehaviorSubject('view');
  public lazyModules: ModuleType[];

  constructor() {
  }

  public get formModeAsObservable(): Observable<FormMode> {
    return this.formMode$.asObservable();
  }

  public get formMode(): FormMode {
    return this.formMode$.value;
  }

  changeFormMode(formMode: FormMode): void {
    this.formMode$.next(formMode);
  }
}
