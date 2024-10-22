import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
} from '@angular/animations';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';
import { zIndex } from 'html2canvas/dist/types/css/property-descriptors/z-index';

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
      query('.backdrop', [animate('300ms ease-out', style({ opacity: 0.7 }))]),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
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
