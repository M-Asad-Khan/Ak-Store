import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {

  @Output() showCategory = new EventEmitter<string>()
  categoriesSubscription: Subscription | undefined;
  categories: Array<string> | undefined;

  constructor(private storeServices: StoreService) { }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeServices.getAllCategories().subscribe((_categories) =>
      this.categories = _categories)
    console.log('Method not implemented.', this.categories);
  }

  handleShowCategory(category: string): void {
    console.log("category 123", category)

    this.showCategory.emit(category);
  }

}
