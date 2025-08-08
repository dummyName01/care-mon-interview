import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListStore } from './list-store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  imports: [CommonModule, MatProgressSpinnerModule, MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AsyncPipe,],
  templateUrl: './list.html',
  styleUrl: './list.css',
  providers: [ListStore],
})
export class List implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public store: ListStore) {}

  ngOnInit() {
    this.store.loadItems();
  }
   ngAfterViewInit() {
    this.store.items$.subscribe(items => {
      this.dataSource.data = items;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onEdit(item: any) {
    const updatedData = {
      name: item.name + ' (Edited)',
      description: item.description + ' (Updated)'
    };

    this.store.updateItem({ id: item.id, updatedData })
    console.log('Edit:', item);
  }

  onDelete(item: any) {
    console.log('Delete:', item);
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      this.store.deleteItem(item.id);
    }
  }

}
