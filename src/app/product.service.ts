import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }

  async addProduct(product: Product) {
    try {
      const docRef = await addDoc(collection(this.firestore, "products"), product);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }    
  }

  getProducts(): Observable<Product[]> {
    const collectionRef = collection(this.firestore, 'products');
    return collectionData(collectionRef, {idField: 'productId'}) as Observable<Product[]>;
  }

  getProduct(id: string): Observable<Product> {
    const docRef = doc(this.firestore, `products/${id}`);
    return docData(docRef, { idField: 'productId' }) as Observable<Product>;
  }

  async deleteProduct(id: string) {
    await deleteDoc(doc(this.firestore, `products/${id}`));
  }

  async updateProduct(product: Product) {
    await setDoc(doc(this.firestore, `products/${product.productId}`), product)
  }
}