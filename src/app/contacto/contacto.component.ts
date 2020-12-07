import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  clientes;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.loadClientes()
  }

  loadClientes(){
    this.api.get('clientes').subscribe(
      rt=>{
        this.clientes=rt;
      }
    )
  }

}
