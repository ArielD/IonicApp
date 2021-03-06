import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/shared/models/products.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  private apiURL = environment.apiTest; 
  public productId: string;
  public product: ProductModel;
  public productImage: File;
  public previewImage;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    public navCtrl: NavController
  ) { 
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(this.productId).subscribe((x) => {
      this.product = x;
    })
  }

  ngOnInit() {
  }

  public navigateBack() {
    this.navCtrl.navigateRoot(['admin/products-management/list-products']);
  }

  public updateProduct() {
    this.productsService.updateProduct(this.product).subscribe();
    this.productsService.uploadImage(this.productImage, this.productId).subscribe();
    this.productsService.setUpdatedProduct(this.product);
    this.getImage();
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

  public getImage(): string {
    return this.apiURL + "products/uploads/" + this.productId;
  }
}
