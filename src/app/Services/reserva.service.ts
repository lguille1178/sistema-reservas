import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Reserva } from '../Models/Reserva';
import { RespuestaApi } from '../Models/RespuestaApi';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Reservas";

  constructor() { }
  //aqui hacemos el http get
  lista(){
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  obtener(id:number){
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  crear(objeto:Reserva){
    return this.http.post<RespuestaApi>(this.apiUrl,objeto);
  }

  editar(objeto:Reserva ){
    return this.http.put<RespuestaApi>(`${this.apiUrl}/${objeto.idReserva}`,objeto);
  }

  eliminar(id:number){
    return this.http.delete<RespuestaApi>(`${this.apiUrl}/${id}`);
  }

}
