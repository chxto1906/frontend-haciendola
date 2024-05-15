import { Component, Input, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ProductUpdate } from '../../interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  myForm: FormGroup;
  loading: boolean = false;

  message: string = "";

  @Input('id') idProduct: number = 0;

  private productService = inject(ProductService);
  

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.myForm =this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      handle: ['', Validators.required],
      sku: ['', Validators.required],
      grams: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      comparePrice: ['', Validators.required],
      barcode: ['', Validators.required],
    });
  }  

  


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params', params);
      const id = +params['id'];
      console.log('idProduct', id);
      if (id > 0) {
        this.idProduct = id;
        this.productService.getProduct(this.idProduct).subscribe((data: any) => {
          this.myForm.patchValue(data.result);
        });
      }
    });
    
    
  }

  regresar(){
    this.router.navigate(["/dashboard"]);
  }

  onSubmit(): void {
    this.loading = true;
    const that = this
    if (this.myForm.valid) {
      const objeto : ProductUpdate = {
        title: this.myForm.get('title')?.value,
        description: this.myForm.get('description')?.value,
        handle: this.myForm.get('handle')?.value,
        sku: this.myForm.get('sku')?.value,
        grams: this.myForm.get('grams')?.value,
        stock: this.myForm.get('stock')?.value,
        price: this.myForm.get('price')?.value,
        comparePrice: this.myForm.get('comparePrice')?.value,
        barcode: this.myForm.get('barcode')?.value,
      }
    
      if(this.idProduct == 0){
        this.productService.createProduct(objeto).subscribe({
          next:(data) =>{
            if(!data.error){
              this.toastr.success("Producto creado exitosamente", "Exito")
              that.router.navigate(["/dashboard"]);
            }else{
              this.toastr.error(data.message, "Error")
            }
            this.loading = false;
          },
          error:(err) =>{
            this.toastr.error(err.message, "Error")
            this.loading = false;
          }
        })
      }else{
        this.productService.updateProduct(this.idProduct,objeto).subscribe({
          next:(data) =>{
            if(!data.error){
              this.toastr.success("Producto actualizado exitosamente", "Exito")
              that.router.navigate(["/dashboard"]);
            }else{
              this.toastr.error(data.message, "Error")
            }
            this.loading = false;
          },
          error:(err) =>{
            this.toastr.error(err.message, "Error")
            this.loading = false;
          }
        })
      }
    } else {
      this.toastr.error("Formulario incompleto", "Error")
      this.loading = false;
    }
  }

}
