import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();


  sort: string = "desc";
  itemShowCount: number = 10;

  constructor() { }

  ngOnInit(): void {
    console.log('Method not implemented.');
  }

  handleSortUpdate(vaule: string): void {
    this.sort = vaule;
    this.sortChange.emit(vaule)
  }

  handleUpdateCount(value: number) {
    this.itemShowCount = value
    this.itemsCountChange.emit(value)
  }

  handleUpdateColumns(value: number) {
    this.columnsCountChange.emit(value)

  }

}
