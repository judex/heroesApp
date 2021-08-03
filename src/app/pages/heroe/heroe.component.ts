import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
  }

  guardar(form: NgForm){
    if( form.invalid ){
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text : 'Guardando información',
      icon : 'info',
      allowOutsideClick: false
    })

    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe( this.heroe )

    } else {
      peticion = this.heroesService.crearHeroe( this.heroe )
    }

    peticion.subscribe(resp =>{
      console.log(resp);
      this.heroe = resp;
      Swal.fire({
        title: this.heroe.nombre,
        text : 'Se actualizó correctamente',
        icon : 'success'
      })
    });
    // console.log(form);
    // console.log(this.heroe);
  }

}
