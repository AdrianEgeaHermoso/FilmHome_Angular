import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData,Firestore,addDoc, setDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }

  async addProduct(product:Product){

    try {
      const docRef = await addDoc(collection(this.firestore, "products"),product);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  getProducts() : Observable <Product[]> {
    return collectionData(collection(this.firestore, 'products'),{idField:'productId'}) as Observable <Product[]>;

  }

  async deleteProduct(id:string){
    console.log('hola');
    await deleteDoc(doc(this.firestore, `products/${id}`));
  }

  async updateProduct(product: Product){
    console.log(product)
    await setDoc(doc(this.firestore, `products/${product.productId}`), product);
   
  }

  getProduct(id: string): Observable<Product>{

    return docData(doc(this.firestore, `products/${id}`), {idField:'prodcutId'}) as Observable <Product> ;

  }

}
