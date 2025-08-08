import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ListItem, ListService } from './list-service';

interface ListState {
  items: any[];
  loading: boolean;
  error: string | null;
}

@Injectable()
export class ListStore extends ComponentStore<ListState> {
  constructor(private http: HttpClient, private listService: ListService) {
    super({ items: [], loading: false, error: null });
  }

  readonly items$ = this.select(state => state.items);
  readonly loading$ = this.select(state => state.loading);
  readonly error$ = this.select(state => state.error);

  readonly loadItems = this.effect<void>(trigger$ =>
    trigger$.pipe(
    tap(() => this.patchState({ loading: true, error: null })),
    switchMap(() =>
      this.listService.getItems().pipe(
        tap(items => this.patchState({ items, loading: false })),
        catchError(error => {
          this.patchState({ error: 'Failed to fetch items', loading: false });
          return of([]);
        })
      )
    )
  )
  );
  readonly updateItem = this.effect<{ id: number; updatedData: Partial<ListItem> }>(action$ =>
    action$.pipe(
      switchMap(({ id, updatedData }) =>
        this.listService.updateItem(id, updatedData).pipe(
          tap({
            next: updated => {
              const items = this.get().items.map(item =>
                item.id === id ? { ...item, ...updated } : item
              );
              this.patchState({ items });
            },
            error: err => this.patchState({ error: 'Failed to update item' }),
          })
        )
      )
    )
  );

  readonly deleteItem = this.effect<number>(id$ =>
    id$.pipe(
      switchMap(id =>
        this.listService.deleteItem(id).pipe(
          tap({
            next: () => {
              const items = this.get().items.filter(item => item.id !== id);
              this.patchState({ items });
            },
            error: err => this.patchState({ error: 'Failed to delete item' }),
          })
        )
      )
    )
  );
}