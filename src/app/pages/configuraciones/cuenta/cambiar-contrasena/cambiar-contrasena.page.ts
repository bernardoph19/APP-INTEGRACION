import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { NgxSpinnerService } from 'ngx-spinner';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { AuthService } from 'src/app/services/auth.service.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {

  @Input()    idusuario : string;
  message               : string = '';
  formChange            : FormGroup;  

  constructor( 
    private modal              : ModalController,
    private spinner            : NgxSpinnerService,
    private svalidator         : FormValidatorService,
    private fb                 : FormBuilder,
    private auth               : AuthService,
    private stoast             : ToastService,

  ) {

    this.create_form();
   }



  create_form(){
    this.formChange = this.fb.group({      
      newpass   : [ '', Validators.required ],
      repeatpass: [ '', Validators.required ]
    });
  }

  get newpassInvalid(){
    return this.svalidator.control_invalid('newpass', this.formChange);
  }

  get repeatpassInvalid(){
    return this.svalidator.control_invalid('repeatpass', this.formChange);
  }



  ngOnInit() {  }
  
  cancelar() {
    this.modal.dismiss({ data: this.message });
  }

  async saveNewPass(){

    if( this.formChange.invalid ){
      return this.svalidator.Empty_data(this.formChange);
    }

    this.spinner.show()

    
    if( this.formChange.value.newpass !== this.formChange.value.repeatpass ){
      
      this.message = 'las contraseñas no coinciden';
      this.spinner.hide();
      this.stoast.showToastShort(this.message);
      return;

    }


    const body = {
      idusuario : this.idusuario,
      password  : this.formChange.value.repeatpass
    } ;
    
    (await this.auth.changePassword(body)).subscribe( response =>{

      this.message = 'Operacion correcta';
      this.spinner.hide();
      
      this.modal.dismiss({data : this.message});

    }, ( error )=>{

      console.log(error)
      const cnn_expi = error.error === 'Unauthorized';      
      this.message = cnn_expi ? 'conexion expirada, vuelva a iniciar sesion' : error.error.message ?? 'Sin conexion al servidor';
      this.spinner.hide();
      this.stoast.showToastShort(this.message);

    })
  } 


}
