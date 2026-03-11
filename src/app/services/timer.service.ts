import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private countdownTime: number = 2100; // default 35 minutes in seconds
  private currentTime: number = this.countdownTime;
  private timerInterval: any;
  private timerSubject: Subject<number> = new Subject<number>();

  constructor() {}

  startTimer(startTime?: number): Observable<number> {
    this.stopTimer();
    if (startTime) {
      this.currentTime = startTime;
      this.countdownTime = startTime;
    }

    this.timerInterval = setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime--;
        this.timerSubject.next(this.currentTime);
      } else {
        this.stopTimer();
      }
    }, 1000);
    
    return this.timerSubject.asObservable();
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  resetTimer(): void {
    this.currentTime = this.countdownTime;
    this.timerSubject.next(this.currentTime);
  }

  getTimerObservable(): Observable<number> {
    return this.timerSubject.asObservable();
  }

  setExpectedTime(expectedTime: number): void {
    // Logic to handle expected time for runners can be added here
  }

  announceRunner(runnerName: string): void {
    // Logic to announce the runner can be added here
  }
}