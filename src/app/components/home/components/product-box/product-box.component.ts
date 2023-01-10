import { Product } from './../../../../models/product.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode = false

  @Output() addToCart = new EventEmitter();
  @Input() product: Product | undefined;

  constructor() {

  }
  ngOnInit(): void {
    console.log('Method not implemented.');
  }
  onAddToCart(): void {
    this.addToCart.emit(this.product)
  }

}
