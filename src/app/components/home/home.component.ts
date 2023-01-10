import { StoreService } from './../../services/store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  col: number = 3;
  category: string | undefined;
  rowHeight: number = ROWS_HEIGHT[this.col]
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService,
    private storeService: StoreService) { }
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.getProducts();
    console.log('Method not implemented.');
  }

  getProducts() {
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => this.products = _products)
  }

  handleColumnsCountChange(event: number) {
    console.log(event)
    this.col = event

  }

  onShowCategory(category: string) {
    console.log("category", category)
    this.category = category;
    this.getProducts()
  }

  handleAddToCart(product: Product) {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })

  }

  onItemsCountChange(value: number) {
    this.count = value.toString()
    this.getProducts();


  }

  onSortChange(value: string) {
    this.sort = value
    this.getProducts();

  }
}
