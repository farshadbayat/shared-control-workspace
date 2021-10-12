import { animate, state, style, transition, trigger } from '@angular/animations';

export type FadeState = 'visible' | 'hidden';

export const visibleHiddenAnimation = [
trigger('state', [
    state(
      'visible',
      style({
        opacity: '1'
      })
    ),
    state(
      'hidden',
      style({
        opacity: '0'
      })
    ),
    transition('* => visible', [animate('500ms ease-out')]),
    transition('visible => hidden', [animate('500ms ease-out')])
  ])];
