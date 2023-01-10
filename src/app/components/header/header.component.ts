import { Cart, CartItem } from './../../models/cart.model';
import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private _cart: Cart = { items: [] }
  itemsQuantity = 0;
  @Input()
  get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items.map((_item) => _item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private cartService: CartService) { }

  getTotal(item: Array<CartItem>): number {
    return this.cartService.getTotlal(item)
  }
  
  handleClearCart(){
    this.cartService.clearCart()
  }

}
