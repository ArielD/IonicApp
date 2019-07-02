import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ProductModel } from 'src/app/shared/models/products.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  private productId: string;
  public previewImage;
  public productImage: File;
  public product: ProductModel = new ProductModel();

  constructor(
    private productsService: ProductsService,
    public navCtrl: NavController
  ) {
  }

  ngOnInit() {
  }

  public navigateBack() {
    this.navCtrl.navigateRoot(['admin/products-management/list-products']);
  }

  public createProduct() {
    this.productsService.addProduct(this.product).subscribe();
    if (this.previewImage) {
      this.productsService.uploadImage(this.productImage, this.productId).subscribe();
    }
    this.productsService.setAddedProduct(this.product);
    this.navigateBack();
  }

  public uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result;
      reader.readAsDataURL(file);
    }
    this.productImage = event.target.files[0];
  }
}
