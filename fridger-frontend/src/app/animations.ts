import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 0.7 })),
  ]),
  transition(':leave', [animate('200ms ease-out', style({ opacity: 0 }))]),
]);

export const rightSlideInOutAnimationComp = trigger('componentAnimations', [
  transition(':enter', [
    style({
      position: 'absolute',
      top: '0%',
      left: '100%',
      opacity: 0,
      zIndex: 99999,
      width: '100%',
    }),
    group([animate('300ms ease', style({ opacity: 1, left: '0%' }))]),
  ]),
  transition(':leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 99999,
      width: '100%',
    }),
    animate('300ms ease', style({ left: '100%' })),
  ]),
]);

export const rightSlideInOutAnimation = trigger('routeAnimations', [
  transition('MyAccount => EditProfile', [
    query(':enter', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 99999,
        width: '100%',
      }),
    ]),
    query('.backdrop', [
      style({
        opacity: 0,
        display: 'block',
      }),
    ]),
    query(':enter', [style({ left: '100%' })], { optional: true }),
    group([
      query('.backdrop', [animate('300ms ease', style({ opacity: 0.7 }))]),
      query(':enter', [animate('300ms ease', style({ left: '0%' }))], {
        optional: true,
      }),
    ]),
  ]),
  transition('EditProfile => MyAccount', [
    query(':leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        width: '100%',
      }),
    ]),
    query('.backdrop', [
      style({
        opacity: 0.7,
        zIndex: 99,
        display: 'block',
      }),
    ]),
    group([
      query('.backdrop', [animate('200ms ease-out', style({ opacity: 0 }))]),
      query(':leave', [animate('200ms ease-out', style({ left: '100%' }))]),
    ]),
  ]),
]);
