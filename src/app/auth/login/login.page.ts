import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service.service';
import { FormGroup,  FormBuilder, Validators} from '@angular/forms';
import { ValidarformloginService } from 'src/app/services/validarformlogin.service';
import { Router } from '@angular/router';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin        : FormGroup;
  token            : string;
  datosLogin       : Array<any>;

  constructor(
    private auth             : AuthService,
    private vform            : ValidarformloginService,
    private formBuilder      : FormBuilder,
    private router           : Router,
    private dataLocalService : DataLocalService
    
  ) {
    this.CrearFormulario();
   }

  ngOnInit() {
  }

  CrearFormulario() {
    this.formLogin = this.formBuilder.group({
      ruc          : [ '', [ Validators.required, Validators.minLength(11)] ],
      usuario      : [ '', [ Validators.required, Validators.minLength(1)] ],
      password     : [ '', [ Validators.required, Validators.minLength(3) ] ],
    })
  }

  inicioSesion() {

    if( this.formLogin.invalid ){
      return this.vform.emptyData(this.formLogin);
    }

    const body = {
      ... this.formLogin.value
    };

    /* const body = {
      "ruc": "20355166547",
      "usuario": "ingenieria",
      "password": "123."
    } */
    this.auth.login(body)
      .subscribe( (res : any) => {

        if( res.message === "exito" ){
          
          this.datosLogin = res.result;           
          this.dataLocalService.setUserLogin( 'this.datosLogin' );          
          this.resetForm();
          this.navigateRute();
          
        }
      }, () => { 

      });

  }

  //Redireccionamiento
  navigateRute(){
    this.router.navigate(['/inicio'],  { replaceUrl: true });
  }
  resetForm(){
    this.formLogin.reset();
  }
 
  //Metodos GET para capturar errores en los inputs
  get rucNovalido(){
    return this.vform.controlInvalid("usuario", this.formLogin);
  }

  get userNovalido(){
    return this.vform.controlInvalid("usuario", this.formLogin);
  }

  get passNovalido(){
    return this.vform.controlInvalid("password", this.formLogin);
  }

}
