import { Component, Input, OnInit, inject, input } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { ReservaService } from '../../Services/reserva.service';
import { Router } from '@angular/router';
import { Reserva } from '../../Models/Reserva';




@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent implements OnInit{
  
  @Input('id')idReserva!:number;
  private reservaServicio = inject(ReservaService);
  public formBuild =inject(FormBuilder);

  public formReserva:FormGroup = this.formBuild.group({
    nombre:[''],
    idSala:[1],
    fecha:['2024-05-01'],
    horaInicio:['10:10:00'],
    duracion:[1],
    estado:['True'],
    idUsuario:[1],
    esCliente:[1]
  })

constructor(private router:Router){}

ngOnInit(): void {
  if(this.idReserva != 0){
    this.reservaServicio.obtener(this.idReserva).subscribe({
      next:(data)=>{
        this.formReserva.patchValue({
          nombre:data.nombre,
          idSala:data.idSala,
          fecha:data.fecha,
          horaInicio:data.horaInicio,
          duracion:data.duracion,
          estado:data.estado,
          idUsuario:data.idUsuario,
          esCliente:data.esCliente
        })
      },
      error:(err)=> {
       console.log(err.message); 
      }
    })
  }
}

guardar(){
  const objeto: Reserva = {
    idReserva:this.idReserva,
    nombre: this.formReserva.value.nombre,
    idSala:this.formReserva.value.idSala,
    fecha:this.formReserva.value.fecha,
    horaInicio:this.formReserva.value.horaInicio,
    duracion:this.formReserva.value.duracion,
    estado:true,
    idUsuario:1,
    esCliente: true,
  }
  if (this.idReserva == 0) {
    this.reservaServicio.crear(objeto).subscribe({
      next:(data)=>{
        if (data.exito) {
          this.router.navigate(["/"]);
        }else{
          alert("Registo Creado con exito")
          this.router.navigate(["/"]);
        }
      },
      error:(err)=> {
       console.log(err.message); 
      }
    })    
  }else{
    this.reservaServicio.editar(objeto).subscribe({
      next:(data)=>{
        if (data.exito) {
          this.router.navigate(["/"]);
        }else{
          this.router.navigate(["/"]);
          alert("Error al Editar")
        }
      },
      error:(err)=> {
        alert("Se ha almacenado con exito");
        this.router.navigate(["/"]);
       console.log(err.message); 
      }
    })    
  }
}

volver(){
  this.router.navigate(["/"]);
}

}
