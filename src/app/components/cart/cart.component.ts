import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart = {
    items: []
  }

  displayedColumns: Array<string> = [
    'product',
    "name",
    'price',
    'quantity',
    'total',
    'actions'
  ]

  dataSource: Array<CartItem> = []

  constructor(private cartService: CartService, private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) =>
      this.cart = _cart)
    this.dataSource = this.cartService.cart.value.items;
    console.log('Method not implemented.');
  }

  getTotal(item: Array<CartItem>): number {
    return this.cartService.getTotlal(item)
  }
  handleClearCart() {
    this.cartService.clearCart()

  }

  handleRemoveItem(element: CartItem): void {
    this.cartService.removeItemFromCart(element)

  }
  handleAddQuantity(item: CartItem): void {

    this.cartService.addToCart(item)

  }

  handleRemoveQuantity(item: CartItem): void {
    this.cartService.removeFromCart(item)

  }

  checkoutPayment(): void {
    this.httpClient.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51MOhc1GlkS9mjP0WFZ1L1e3GglrOztkKAWdax3D96PEDg8I3T2z7bP5GtAPupesTcFzufMWnbT0gC7vVYfOivMdO00nm7ZUuki')
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })

  }

}
