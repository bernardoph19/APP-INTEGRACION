import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service.service';
import { CambiarContrasenaPage } from '../cambiar-contrasena/cambiar-contrasena.page';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.page.html',
  styleUrls: ['./micuenta.page.scss'],
})
export class MicuentaPage implements OnInit {

  cambiarcontra       : boolean;
  guardar             : boolean;
  message             : string;
  
  d                   : any = {};
  formChangePass      : FormGroup;
  formUsuario         : FormGroup;

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
    this.createForm_Pass();
    this.createForm_Usuario();

  }

 
  createForm_Pass() {
    this.formChangePass = this.fb.group({
      passNow   : [ '', Validators.required ],
      newpass   : [ '', Validators.required ],
      repeatpass: [ '', Validators.required ]
    });
  }

  createForm_Usuario(){
    this.formUsuario = this.fb.group({
      idusuario         : [ this.d.IdUsuario ],
      idrol             : [ this.d.idrol ],
      ruc               : [ this.d.ruc ],
      usuario           : [ this.d.Usuario, Validators.required ],
      password          : [ '' ],
      nombre            : [ this.d.NombreTrabajador, Validators.required ],
      apellido          : [ this.d.ApellidoTrabajador, Validators.required ],
      numerodocumento   : [ this.d.DNI, Validators.required ],
      telefono          : [ this.d.Telefono, Validators.required ],
      correo            : [ this.d.Correo, Validators.required ],
      editar            : [ true ]
    });
  }


  editar: boolean;

  async ngOnInit() {
    this.d = await this.auth.obtenerDatosStorage();
    
  }


  //Modal Cambiar Contraseña
  async cambiarContrasena() {
    /* const modal = await this.modal.create({
      component: CambiarContrasenaPage,
      componentProps: {
        // nombre: 'Bernardo ',
        // pais: 'Peru',
      },
    });
    
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log('retorno con daots', data); */

    this.presentToast('Próximamente ... ');
    
    
  }

  onSubmit() {

  }


  async ModificarUsuario() {    
    
    if( this.formUsuario.invalid ) { return this.svalidator.Empty_data(this.formUsuario); }
    
    const body = { ...this.formUsuario.value  };
    this.spinner.show();

    (await this.auth.saveUser( body ).then(r => r)).subscribe( async response =>{
      
      let   newDatos = await this.auth.getLoginStorage('login');
      const datos    = newDatos.datos;
            
      datos['NombreTrabajador']     = body.nombre;
      datos['ApellidoTrabajador']   = body.apellido;
      datos['Telefono']             = body.telefono;
      datos['Correo']               = body.correo;
      datos['DNI']                  = body.numerodocumento;

      newDatos.splice(0, 1);
      newDatos.unshift(datos);

      this.auth.setDatosStorage('login', newDatos);
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


  changePass() {

  }

  showEditar() {
    //this.editar= !this.editar
    this.presentToast('Próximamente ...')
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
