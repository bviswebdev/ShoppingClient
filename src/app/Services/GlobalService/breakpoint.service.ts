import { Injectable } from '@angular/core';
import { Breakpoints } from 'src/app/Models/global.model';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  breakpoints: Breakpoints = new Breakpoints();
  constructor() {}

  set setXs(val: boolean) {
    this.breakpoints.xs = val;
  }
  set setSm(val: boolean) {
    this.breakpoints.sm = val;
  }
  set setMd(val: boolean) {
    this.breakpoints.md = val;
  }
  set setLg(val: boolean) {
    this.breakpoints.lg = val;
  }
  set setXl(val: boolean) {
    this.breakpoints.xl = val;
  }
  get Xs(): boolean {
    return this.breakpoints.xs;
  }
  get Sm(): boolean {
    return this.breakpoints.sm;
  }
  get Md(): boolean {
    return this.breakpoints.md;
  }
  get Lg(): boolean {
    return this.breakpoints.lg;
  }
  get Xl(): boolean {
    return this.breakpoints.xl;
  }

  setStateXs(): void {
    this.setXs = true;
    this.setSm = false;
    this.setMd = false;
    this.setLg = false;
    this.setXl = false;
  }

  setStateSm(): void {
    this.setXs = false;
    this.setSm = true;
    this.setMd = false;
    this.setLg = false;
    this.setXl = false;
  }

  setStateMd(): void {
    this.setXs = false;
    this.setSm = false;
    this.setMd = true;
    this.setLg = false;
    this.setXl = false;
  }

  setStateLg(): void {
    this.setXs = false;
    this.setSm = false;
    this.setMd = false;
    this.setLg = true;
    this.setXl = false;
  }

  setStateXl(): void {
    this.setXs = false;
    this.setSm = false;
    this.setMd = false;
    this.setLg = false;
    this.setXl = true;
  }
}
