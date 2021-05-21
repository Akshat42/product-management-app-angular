import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProducts} from "./products";
import {ProductService} from "./product.service";
import {Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list-component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.filteredListProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  constructor(private productService: ProductService) {}

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  private _listFilter: string = '';
  private errorMessage: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredListProducts = this.performFilter(value);
  }

  performFilter(filterBy: string): IProducts[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProducts) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  filteredListProducts: IProducts[] = [];

  products: IProducts[] = [];

  toggleImage(): void {
    this.showImage = !this.showImage;
    console.log(this.showImage);
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
  sub! : Subscription;

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
