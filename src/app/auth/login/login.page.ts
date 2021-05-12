import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service.service';
import { FormGroup,  FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastController } from '@ionic/angular';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin        : FormGroup;
  token            : string;
  datosLogin       : Array<any>;
  show             : boolean = false;  
  message          : string;

  constructor(
    private auth               : AuthService,
    private vform              : FormValidatorService,
    private formBuilder        : FormBuilder,
    private router             : Router,
    private spinner            : NgxSpinnerService,
    public  toastController    : ToastController,
    
  ) { this.CrearFormulario(); }

  ngOnInit() { } 

  CrearFormulario() {
    this.formLogin = this.formBuilder.group({
      ruc          : [ '', [ Validators.required, Validators.minLength(11)] ],
      usuario      : [ '', [ Validators.required, Validators.minLength(1)] ],
      password     : [ '', [ Validators.required, Validators.minLength(3) ] ],
    })
  }

  inicioSesion() {

    if( this.formLogin.invalid ){
      return this.vform.Empty_data(this.formLogin);
    }

    this.spinner.show();
    const body = {
      ... this.formLogin.value
    };

    this.auth.login(body)
      .subscribe( (res : any) => {        

        this.auth.setDatosStorage('credenciales', body);
        
        if( res.message === "exito" ){
          
          this.datosLogin = res.result;          
          this.auth.setDatosStorage('login', this.datosLogin);
          
          this.resetForm();          
          this.navigateRute();
          
        }

      }, (err) => {
                
        this.spinner.hide();
        this.message   = (err.error.message)  ?? 'Sin conexion al servidor';        
        this.presentToast(this.message);
        
      });

  }

  //Redireccionamiento
  navigateRute(){
    this.spinner.hide();
    this.router.navigate(['/inicio'],  { replaceUrl: true });
  }  

  resetForm(){
    this.formLogin.reset();
  }
 
  //Metodos GET para capturar errores en los inputs
  get rucNovalido(){
    return this.vform.control_invalid("ruc", this.formLogin);
  }

  get userNovalido(){
    return this.vform.control_invalid("usuario", this.formLogin);
  }

  get passNovalido(){
    return this.vform.control_invalid("password", this.formLogin);
  }
 
  async presentToast(ms: string) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 3000,
      cssClass:"background"
    });

    toast.present();
  }

}
