import { CartItem } from './../models/cart.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({ items: [] })

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {

    const items = [...this.cart.value.items]

    const itemInCart = items.find((_item) => _item.id == item.id)

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item)
    }

    this.cart.next({ items })
    this._snackBar.open("1 itme add into cart successfully ", 'OK', { duration: 3000 })

  }

  removeFromCart(item: CartItem): void {

    let itemForRemove: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_items) => {

      if (_items.id === item.id) {
        _items.quantity--;

        if (_items.quantity == 0) {
          itemForRemove = _items;
        }
      }

      return _items;

    })

    if (itemForRemove) {
      filteredItems = this.removeItemFromCart(itemForRemove, false)
    }

    this.cart.next({ items: filteredItems })
    this._snackBar.open('Item remove succesfully', 'OK', { duration: 3000 })

  }
  getTotlal(items: Array<CartItem>): number {

    return items.map((item) => item.price * item.quantity).reduce((prev, current) => prev + current, 0)
  }

  clearCart(): void {
    this.cart.next({ items: [] })
    this._snackBar.open("Cart clear successfylly", 'OK', { duration: 3000 })
  }

  removeItemFromCart(element: CartItem, update = true): Array<CartItem> {

    const filteredCart = this.cart.value.items.filter((_item) => _item.id !== element.id)

    if (update) {

      this.cart.next({ items: filteredCart })
      this._snackBar.open('Item remove from cart successfully', 'OK', { duration: 3000 })
    }
    return filteredCart;

  }

}
