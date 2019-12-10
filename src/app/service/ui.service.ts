import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  private showProgressBar = new Subject<boolean>()
  public showProgressBar$ = this.showProgressBar.asObservable()

  private isMobile = new BehaviorSubject<boolean>(false)
  public isMobile$ = this.isMobile.asObservable()
  
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
    ]).subscribe(result => {
      this.isMobile.next(result.matches)
    })
  }

  setShowProgressBar(show) {
    this.showProgressBar.next(show)
  }
}
