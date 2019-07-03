import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { ProductModel } from '../shared/models/products.model';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public apiURL = environment.apiTest; 
  public products: ProductModel[];
  public serchText: string;
  public updatedProduct: ProductModel;

  constructor(
    private productsService: ProductsService,
    private navCtrl: NavController
  ) {
    if (this.productsService.getUpdatedProduct()) {
      this.updatedProduct = this.productsService.getUpdatedProduct()
    }

    this.productsService.getAll().subscribe((x) => {
      this.products = x;
      if (this.productsService.getUpdatedProduct()) {

      }
    })
   }

  ngOnInit() {
  }

  public getImage(id: string) {
    this.productsService.getImage(id).subscribe((x) => {
      console.log(x);
    });
  }

  public checkError(event: Event) {
    console.log(event);   
  }

  public navigateToDetails(id: string) {
    this.navCtrl.navigateRoot(['tabs/product-details', id])
  }
}
