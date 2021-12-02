import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from '../../services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {

  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;

  constructor( private shortUrlService: ShortUrlService) { 
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
  }

  ngOnInit(): void {
  }

  procesarUrl(){

    //validar si la url es vacia

    if(this.nombreUrl === ''){
        this.error('Por favor ingrese una URL');
    }
    this.urlProcesada = false;
    this.loading = true;
    setTimeout(() => {
      this.obtenerUrlShort();
    }, 1000);
    
  }

  obtenerUrlShort(){
    this.shortUrlService.getUrlShort(this.nombreUrl).subscribe(resp => {
      this.loading = false;
      this.urlProcesada = true; 
      this.urlShort = resp.link;
    }, error => {
      this.loading = false;
      this.nombreUrl = '';
      if(error.error.description === 'The value provided is invalid.'){
          this.error('La url ingresada es invalida');
      }
      this.loading = false;
    });
  }

  error(valor: string){
    this.mostrarError = true;
    this.textError = valor;
    setTimeout(() => {
      this.mostrarError = false;
    }, 1000);
  }

}
