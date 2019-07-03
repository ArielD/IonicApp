import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartModel, LocalStorageCartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiURL = environment.apiTest;
  private currentCart: BehaviorSubject<LocalStorageCartModel[]> = new BehaviorSubject<LocalStorageCartModel[]>(null);

  constructor(
    private http: HttpClient
  ) { }

  getProduct(id: string): Observable<CartModel> {
    return this.http.get<CartModel>(this.apiURL + `products/getProduct?_id=${id}`);
  }

  updateCart(item: LocalStorageCartModel): void {
    let currentCart: LocalStorageCartModel[] = JSON.parse(localStorage.getItem('cart'));
    if (currentCart) {
      let index = currentCart.findIndex((x, i) => {
        return x._id == item._id;
      });

      currentCart[index] = item;
    }
    localStorage.setItem('cart', JSON.stringify(currentCart))
    this.currentCart.next(currentCart)
  }

  removeProduct(id: string): void {
    let currentCart: LocalStorageCartModel[] = JSON.parse(localStorage.getItem('cart'));
    if (currentCart) {
      currentCart = currentCart.filter((x) => {
        return x._id != id;
      });
    }

    if (currentCart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(currentCart));
    } else {
      localStorage.removeItem('cart')
    }

    this.currentCart.next(currentCart)
  }

  cleanCart(): void {
    localStorage.removeItem('cart');
    this.currentCart.next(null)
  }

  public getCartValue() {
    return this.currentCart.getValue();
  }
}
