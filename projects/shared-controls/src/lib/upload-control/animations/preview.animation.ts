import { animate, state, style, transition, trigger } from '@angular/animations';

export const previewAnimation = [
    trigger('changeDivSize', [
      state('close', style({
        opacity: 0,
        transform: 'scale(0)'
      })),
      state('open', style({
        opacity: 1.0,
        transform: 'scale(1)'
      })),
      transition('initial=>final', animate('400ms ease-out')),
      transition('final=>initial', animate('200ms ease-out'))
    ]),
  ]