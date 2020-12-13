import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeSubject: BehaviorSubject<boolean>;

  constructor(private storeServe: StorageService) {
    this.darkModeSubject = new BehaviorSubject(this.storeServe.getDarkMode());
  }

  public getDarkModeObservable() {
    return this.darkModeSubject.asObservable();
  }

  public setDarkMode(value: boolean) {
    this.darkModeSubject.next(value);
    this.storeServe.setDarkMode(value);
  }

  public toggleDarkMode() {
    this.setDarkMode(!this.darkModeSubject.getValue());
  }
}
