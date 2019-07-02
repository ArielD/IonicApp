import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CartModel, LocalStorageCartModel } from '../shared/models/cart.model';
import { CartService } from '../shared/services/cart.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public apiURL = environment.apiTest;
  public currentProductCart: CartModel[];
  public localCart: LocalStorageCartModel[];
  public totalPrice: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private alertCtrl: AlertController
    
  ) {
    this.localCart = JSON.parse(localStorage.getItem('cart'));

    if (this.localCart) {
      this.currentProductCart = [];
      for (let item of this.localCart) {
        this.cartService.getProduct(item._id).subscribe((x) => {
          this.currentProductCart.push(x);
          x.quantity = item.quantity;
          this.totalPrice = this.totalPrice + x.quantity * x.price
        })
      }
    }
  }

  ngOnInit() {
  }

  public navigateToDetails(id: string): void {
    this.router.navigate(['tabs/product-details', id])
  }

  public removeOne(item: CartModel) {
    if (item.quantity !== 1) {
      item.quantity = item.quantity - 1;
      this.totalPrice -= item.price;
    } else {
      item.quantity = 1;
      this.alertCtrl.create({
        header: 'Are you sure?', message: 'Do you really want to delete the product from your cart?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.cartService.removeProduct(item._id);
          }
        }]
      })
        .then(AlertEl => {
          AlertEl.present();
        });
    }
    this.cartService.updateCart({ _id: item._id, quantity: item.quantity })
  }

  public addOne(item: CartModel) {
    if (item.quantity !== 100) {
      item.quantity = item.quantity + 1;
      this.totalPrice += item.price;
    } else {
      item.quantity = 100;
    }
    this.cartService.updateCart({ _id: item._id, quantity: item.quantity });
  }

  public cleanCart(): void {
    this.alertCtrl.create({
      header: 'Are you sure?', message: 'Do you really want to delete all products from the cart?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          this.cartService.cleanCart();
          this.localCart = null;
        }
      }]
    })
      .then(AlertEl => {
        AlertEl.present();
      });
  }
}
