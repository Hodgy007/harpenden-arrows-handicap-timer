import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/runners'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getRunners(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addRunner(runner: { name: string; expectedTime: number }): Observable<any> {
    return this.http.post(this.apiUrl, runner);
  }

  deleteRunner(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}