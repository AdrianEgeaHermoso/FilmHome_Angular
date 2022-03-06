import { Component, OnInit } from '@angular/core';
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
    format: new FormControl(''),
    score: new FormControl(''),
    picture: new FormControl(''),
  });


  formButtonText: string = 'Añadir Película';
  displayProductForm = false;
  displayConfirmDelete = false;
  idForDeletion = '';
  descriptionForDeletion = '';

  public images=[
    {src:'/assets/img/marlon.png'},
    {src:'assets/img/marilyn.png'},
    {src:'assets/img/burt.png'},
    {src:'assets/img/marx.png'},
  ];

  edad = 0;


  constructor(public productService:ProductService){

    this.products = this.productService.getProducts();
  }

  ngOnInit(): void{}


  addProduct(){

    this.productService.addProduct(this.productForm.value);
    this.productForm.reset({score:0,purchasePrice:0});
    
  }

  updateProductStep1(id: string){
    this.displayProductForm = true;

    this.productService.getProduct(id).subscribe(data => this.productForm.patchValue(data));

    this.formButtonText = "Actualizar Película";


  }

  updateProductStep2(){
    
    this.productService.updateProduct(this.productForm.value);
    this.formButtonText = "Añadir Película";
    
    
  }

  cancel() {
    this.productForm.reset();
    this.formButtonText = "Añadir Película";
    this.displayProductForm = false;
  }

  formSubmit(){
    if(this.formButtonText === 'Añadir Película'){this.addProduct();
    }else{
      this.updateProductStep2();
    }
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
