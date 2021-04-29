import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service.service';
import { FormGroup,  FormBuilder, Validators} from '@angular/forms';
import { ValidarformloginService } from 'src/app/services/validarformlogin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ToastController } from '@ionic/angular';

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
    private vform              : ValidarformloginService,
    private formBuilder        : FormBuilder,
    private router             : Router,
    private dataStorageService : DataStorageService,
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
      return this.vform.emptyData(this.formLogin);
    }

    this.spinner.show();
    const body = {
      ... this.formLogin.value
    };

    this.auth.login(body)
      .subscribe( (res : any) => {        

        this.dataStorageService.set('credenciales', body);
        if( res.message === "exito" ){
          
          this.datosLogin = res.result;
          
          this.dataStorageService.set('login', this.datosLogin);
          
          this.resetForm();
          this.spinner.hide();
          this.navigateRute();
          
        }

      }, (err) => {
                
        this.message   = (err.error.message)  ?? 'Sin conexion al servidor';

        this.spinner.hide();
        
        this.presentToast(this.message);
        
      });

  }

  //Redireccionamiento
  navigateRute(){
    this.router.navigate(['/inicio'],  { replaceUrl: true });
  }

  navRutePrefs() {
    this.router.navigate(['/menu-principal/migrador'],  { replaceUrl: true });
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

  recordarLogin() {    
    const userlogueado = this.dataStorageService.get('login');
    if( userlogueado !== null ) this.navRutePrefs();    
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
