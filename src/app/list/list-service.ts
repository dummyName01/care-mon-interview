import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ListItem {
  id: number;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ListService {
  private apiUrl = 'http://localhost:3000/api/items'; // or /list

  constructor(private http: HttpClient) {}

  getItems(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(this.apiUrl);
  }

  updateItem(id: number, data: Partial<ListItem>): Observable<ListItem> {
    return this.http.put<ListItem>(`${this.apiUrl}/${id}`, data);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
