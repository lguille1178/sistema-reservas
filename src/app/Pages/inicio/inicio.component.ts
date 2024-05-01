import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReservaService } from '../../Services/reserva.service';
import { Reserva } from '../../Models/Reserva';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {
    private reservaServicio = inject(ReservaService);
    public listaReservas:Reserva[] = [];
    public displayedColumns: string[] = ['Nombre','IdSala','Fecha','HoraInicio','Duracion','Estado','IdUsuario','EsCliente','accion'];

    obtenerReservas(){
      this.reservaServicio.lista().subscribe({
        next:(data)=>{
          if(data.length > 0 ){
            this.listaReservas = data;
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }  
    constructor(private route:Router){
      this.obtenerReservas();
    }
    
    nuevo(){
      this.route.navigate(['/reserva',0]);
    }
    editar(objeto:Reserva){
      this.route.navigate(['/reserva',objeto.idReserva]);
    }
    
    
    eliminar(objeto:Reserva){
      
    if(objeto.estado == true){      
        if(confirm("Desea eliminar la reserva" + objeto.nombre)){
          this.reservaServicio.eliminar(objeto.idReserva).subscribe({
            next:(data)=>{
              if(data.exito){
                this.obtenerReservas();
              }else{
                alert(`no se pudo eliminar ${data.mensajeError}`)
              }
            },
            error:(err)=>{
              console.log(err.message)
            }
          })
        }
      }else{
        alert(`Esta Rervacion a nombre de ${objeto.nombre} fue cancelada`)
      }
      
    }

  }

