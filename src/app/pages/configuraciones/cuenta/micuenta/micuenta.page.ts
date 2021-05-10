import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service.service';
import { CambiarContrasenaPage } from '../cambiar-contrasena/cambiar-contrasena.page';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.page.html',
  styleUrls: ['./micuenta.page.scss'],
})
export class MicuentaPage implements OnInit {

  cambiarcontra       : boolean;
  guardar             : boolean;
  message             : string;
  changePass          : boolean      = false;
  idusuario           : string;
  
  datosComplete       : any = {}
  d                   : any = {};
  formPass            : FormGroup;
  formUsuario         : FormGroup;
  editar              : boolean;

  constructor( 
    private modal              : ModalController,
    private auth               : AuthService,
    private svalidator         : FormValidatorService,
    private spinner            : NgxSpinnerService,
    private fb                 : FormBuilder,
    private salert             : AlertService,
    public  toastController    : ToastController,

  ) {

    this.cambiarcontra = false;
    this.guardar =false;
    this.loadStorage();

    this.createForm_Usuario();
    this.createForm_Pass();
  }

  
 
  createForm_Pass() {
    this.formPass = this.fb.group({ passNow   : [ '', Validators.required ] });
  }

  get passNowInvalid(){
    return this.svalidator.control_invalid('passNow', this.formPass);
  }




  createForm_Usuario() {
    this.formUsuario = this.fb.group({
      idusuario         : [ this.d.IdUsuario ],
      idrol             : [ this.d.idrol ],
      ruc               : [ this.d.ruc ],
      usuario           : [ this.d.Usuario, Validators.required ],
      password          : [ '' ],
      //nombre            : [ this.d.NombreTrabajador + ' ' + this.d.ApellidoTrabajador, Validators.required ],
      nombre            : [ this.d.NombreTrabajador, Validators.required ],
      apellido          : [ this.d.ApellidoTrabajador, Validators.required ],
      numerodocumento   : [ this.d.DNI, Validators.required ],
      telefono          : [ this.d.Telefono, Validators.required ],
      correo            : [ this.d.Correo, Validators.required ],
      editar            : [ true ]
    });
  }

  get Nombre(){
    return this.svalidator.control_invalid('nombre', this.formUsuario);
  }

  get Apellidos(){
    return this.svalidator.control_invalid('apellido', this.formUsuario);
  }  

  get Telefono(){
    return this.svalidator.control_invalid('telefono', this.formUsuario);
  }

  get Correo(){
    return this.svalidator.control_invalid('correo', this.formUsuario);
  }




  async ngOnInit() { }

  async loadStorage() {
    this.datosComplete = await this.auth.getLoginStorage('login');
    this.d = this.datosComplete.datos;
    console.log(this.d)
  }


  //Modal Cambiar Contraseña
  async cambiarContrasena() {    

    if( this.formPass.controls.passNow.invalid ){
      this.formPass.controls.passNow.markAsTouched();
      return;
    }   
    
    this.spinner.show();

    const body = {
      ruc     : this.d.ruc,
      usuario : this.d.Usuario,
      password: this.formPass.value.passNow
    }

    this.auth.login( body ).subscribe( (response : any ) => {
      if( response.message === 'exito' ){
        this.idusuario = response.result.datos.IdUsuario;

        this.saveNewPass(this.idusuario)
      }
    
      this.spinner.hide();

    }, (error)=>{

      this.changePass = false;
      this.message = error.error.message === null || error.error.message === undefined ? "Sin conexion al servidor" : 'La contraseña que ingreso es incorrecta !!!';
      this.spinner.hide();
      this.presentToast(this.message)
    })
    
  } 

  async ModificarUsuario() {    
    
    if( this.formUsuario.invalid ) { return this.svalidator.Empty_data(this.formUsuario); }
    
    const body = { ...this.formUsuario.value  };
    
    this.spinner.show();

    (await this.auth.saveUser( body ).then(r => r)).subscribe( async response =>{
      
      this.d.NombreTrabajador     = body.nombre;
      this.d.ApellidoTrabajador   = body.apellido;
      this.d.Telefono             = body.telefono;
      this.d.Correo               = body.correo;

      //al parecer es mutable    
      this.auth.setDatosStorage('login', this.datosComplete);
      this.editar = !this.editar;
      this.spinner.hide();
      
      this.salert.alertEditarUser('FC Integracion aviso', 'Sus datos se actualizaron.')

    }, ( error )=>{
      console.log(JSON.stringify(error))
      
      const cnn_expi = error.error === 'Unauthorized';      
      this.message = cnn_expi ? 'conexion expirada, vuelva a iniciar sesion' : error.error.message ?? 'Sin conexion al servidor';
      this.spinner.hide();
      this.salert.alertEditarUser('FC Integracion advertencia', this.message)
    })
  }

  async saveNewPass(id : string) {
    const modal = await this.modal.create({
      component: CambiarContrasenaPage,
      componentProps: {
        idusuario: id,
        // pais: 'Peru',
      },
    });
    
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log('retorno con datos', data);
    
  }


  showEditar() {
    this.editar= !this.editar;

    this.formUsuario.patchValue({
      idusuario         :  this.d.IdUsuario,
      idrol             :  this.d.idrol ,
      ruc               :  this.d.ruc ,
      usuario           :  this.d.Usuario ,
      password          :  '' ,
      numerodocumento   :  this.d.DNI ,
      nombre            :  this.d.NombreTrabajador,
      apellido          :  this.d.ApellidoTrabajador,
      telefono          :  this.d.Telefono,
      correo            :  this.d.Correo,
      editar            :  true 
    });


    //this.presentToast('Próximamente ...')
  }

  async presentToast(ms: string) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 3000,
      cssClass:"toast-mess"
    });

    toast.present();
  }


  
}
