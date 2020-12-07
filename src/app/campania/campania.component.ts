import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import * as Papa from 'papaparse';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-campania',
  templateUrl: './campania.component.html',
  styleUrls: ['./campania.component.css']
})
export class CampaniaComponent implements OnInit {
  dataList : any[];
  headers;
  archivo;
  listaSeleccionada=[];
  arrayFinal=[]
  verFormCampain=true;
  nombreCampain;
  delimitador="";
  configDelimit=[',',';','%'];
  constructor(public api:ApiService,public router:Router) { }

  ngOnInit(): void {
  }

  onChange(files: File[]){
    this.archivo=files[0]
    if(this.archivo){
      Papa.parse(this.archivo, {
        header: true,
        skipEmptyLines: true,
        delimiter:this.delimitador,
        complete: (result,file) => {
          this.headers=result.meta.fields;
          console.log("ENCABEZADOS",this.headers)

        }
      });
    }
  }

  valor(evento){
    if(evento.target.checked){

      let elem:NodeListOf<any> = document.getElementsByName(evento.target.value)
      let valorSelect=elem[0].value

      if(this.listaSeleccionada.length>0){
        let bandera="NO ENCONTRADO";
        for(let item of this.listaSeleccionada){
          if(item==evento.target.value){
            bandera="ENCONTRADO"
          }
        }
        if(bandera=="NO ENCONTRADO"){
          this.listaSeleccionada.push({'real':evento.target.value,'parseado':valorSelect})
        }
      }else{
        this.listaSeleccionada.push({'real':evento.target.value,'parseado':valorSelect})
      }
    }
    else{
      if(this.listaSeleccionada.length>0){
        let bandera="NO ENCONTRADO";
        for(let item of this.listaSeleccionada){
          if(item['real']==evento.target.value){
            bandera="ENCONTRADO"
            var idx = this.listaSeleccionada.indexOf(item);
            this.listaSeleccionada.splice(idx,1)
          }
        }
      }
    }
    console.log(this.listaSeleccionada)

  }

  cargarSeleccion(){

    if(this.archivo){
      Papa.parse(this.archivo, {
        header: true,
        skipEmptyLines: true,
        delimiter:this.delimitador,
        complete: (result) => {
          this.dataList=result.data;
          let arreglo=[]
          for(let valor of this.dataList){
            let objeto=[]
            for(let clave of this.listaSeleccionada){

              objeto.push([clave['parseado'],valor[clave['real']]])
              console.log(objeto)
            }
            arreglo.push(objeto)
          }

          for(let i=0;i<arreglo.length;i++){
            this.arrayFinal.push(Object.fromEntries(arreglo[i]))
          }

        }
      });
    }
  }



  guardarNombre(nombre){
    this.nombreCampain=nombre;
    this.verFormCampain=false;
  }

  eventoSelect(valor){
    for(let item of this.listaSeleccionada){
      if(item['real']==valor.name){
        item['parseado']=valor.value
      }
    }
  }

  eliminarArchivo(){
    this.archivo=null;
    this.headers=[];
    this.listaSeleccionada=[];
    this.arrayFinal=[]
  }

  elegirOtroArchivo(){
    this.archivo=null;
    this.headers=[];
    this.listaSeleccionada=[];
  }

  guardarDatos(){
    let obj={}
    obj['clientes']=this.arrayFinal
    obj['campain']=this.nombreCampain
    console.log(obj)
    this.api.post('clientes',obj).subscribe(
      rt=>{
        alert(rt)
        this.router.navigate(['/contacto'])
      },error=>{
        console.log(error)
      }
    )
  }

  elegirDelimitador(valor){
    this.delimitador=valor
    console.log(this.delimitador)
  }

}
