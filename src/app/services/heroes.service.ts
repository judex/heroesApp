import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private urlHeroe = 'https://login-app-ada8e-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel) {
    return this.http.post(`${this.urlHeroe}/heroes.json`, heroe)
               .pipe(
                  map( (resp:any) =>{
                    heroe.id = resp.name;
                    return heroe;
                  })
                )
  }

  actualizarHeroe( heroe: HeroeModel ) {
    const heroeTemp = {
      ...heroe
    }
    delete heroeTemp.id;
    return this.http.put(`${this.urlHeroe}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${this.urlHeroe}/heroes.json`)
          .pipe(
            map( this.crearArrglo )
          );
  }

  private crearArrglo( heroesObj: any ){
    const heroes: HeroeModel[] = [];
    console.log(heroesObj);
    if( heroesObj === null ){ //por si no hay ninguna informacion en la BD para listar la tabla
      return [];
    }
    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    })
    return heroes;
  }

}
