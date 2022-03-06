import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  products: Observable<Product[]>;


  productForm = new FormGroup({
    productId: new FormControl(''),
    description: new FormControl(''),
    purchasePrice: new FormControl(''),
    salePrice: new FormControl(''),
    stock: new FormControl(''),
    picture: new FormControl(''),
  });


  formButtonText = 'Add product';
  displayProductForm = false;
  displayConfirmDelete = false;
  idForDeletion = '';
  descriptionForDeletion = '';


  constructor(public productService:ProductService){

    this.products = this.productService.getProducts();
  }


  addProduct(){

    this.productService.addProduct(this.productForm.value);
    this.productForm.reset({salePrice:0,stock:0,purchasePrice:0});
    console.log('addProduct');
  }

  updateProductStep1(id: string){
    console.log(id)
    this.productService.getProduct(id).subscribe(data => this.productForm.patchValue(data));
    this.formButtonText = "Update product";


  }

  updateProductStep2(){
    console.log('updateProductStep2');
    this.productService.updateProduct(this.productForm.value);
    
  }

  formSubmit(){
    this.formButtonText === 'Add product' ? this.addProduct(): this.updateProductStep2();
    this.displayProductForm = false;
  }


  confirmDeleteProduct(product: Product){
    this.idForDeletion = product.productId;
    this.descriptionForDeletion = product.description;
    this.displayConfirmDelete = true;

  }

  deleteProduct(){
    this.productService.deleteProduct(this.idForDeletion);
    this.displayConfirmDelete = false;
  }
}
