import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { RunnerListComponent } from '../runner-list/runner-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  @ViewChild(RunnerListComponent) runnerList!: RunnerListComponent;

  countdownTime: number = 2100; // 35 minutes in seconds
  remainingTime: number = this.countdownTime;
  isRunning: boolean = false;
  editingStartTime: boolean = false;
  editingStartTimeValue: string = '';
  runnerNames: string[] = [];
  checkIns: { number: number; time: string; remainingSeconds: number }[] = [];
  private timerSubscription: Subscription | null = null;

  constructor(private timerService: TimerService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Timer will be started when user clicks the Start button
  }

  startTimer(): void {
    this.isRunning = true;
    this.timerSubscription = this.timerService.startTimer(this.countdownTime).subscribe((time: number) => {
      this.remainingTime = time;
      if (time === 0) this.isRunning = false;
      this.checkRunnerTimes();
      this.changeDetectorRef.markForCheck();
    });
  }

  stopTimer(): void {
    this.isRunning = false;
    this.timerService.stopTimer();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  resetTimer(): void {
    if (!confirm('Reset the timer? This will clear all alerts, race positions and finish times.')) return;
    this.isRunning = false;
    this.timerService.stopTimer();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
    this.checkIns = [];
    this.remainingTime = this.countdownTime;
    this.timerService.resetTimer();
    this.runnerList.resetRaceData();
  }

  checkRunnerTimes(): void {
    this.runnerNames.forEach((runner, index) => {
      if (this.remainingTime === (this.countdownTime - (index + 1) * 60)) {
        this.announceRunner(runner);
      }
    });
  }

  announceRunner(runner: string): void {
    console.log(`Runner ${runner}'s time has been reached!`);
    // Additional logic for announcing can be added here
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  startEditStartTime(): void {
    if (this.isRunning) return;
    this.editingStartTime = true;
    this.editingStartTimeValue = this.formatTime(this.countdownTime);
    setTimeout(() => {
      const input = document.querySelector('.start-time-input') as HTMLInputElement;
      if (input) input.focus();
    }, 0);
  }

  saveStartTime(): void {
    const parts = this.editingStartTimeValue.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10);
      const seconds = parseInt(parts[1], 10);
      if (!isNaN(minutes) && !isNaN(seconds) && seconds <= 59 && minutes >= 0) {
        this.countdownTime = minutes * 60 + seconds;
        this.remainingTime = this.countdownTime;
      }
    }
    this.editingStartTime = false;
    this.changeDetectorRef.markForCheck();
  }

  cancelEditStartTime(): void {
    this.editingStartTime = false;
  }

  recordCheckIn(): void {
    const checkInNumber = this.checkIns.length + 1;
    this.checkIns.push({
      number: checkInNumber,
      time: this.formatTime(this.remainingTime),
      remainingSeconds: this.remainingTime
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}