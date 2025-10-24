import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  getBudgets() { return this.http.get(`${this.base}/budgets`); }
  createBudget(name: string) { return this.http.post(`${this.base}/budgets`, { name }); }
  updateBudget(id: string, name: string) { return this.http.patch(`${this.base}/budgets/${id}`, { name }); }
  deleteBudget(id: string) { return this.http.delete(`${this.base}/budgets/${id}`); }
}
