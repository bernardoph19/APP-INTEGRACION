import { Component, Input, OnInit } from '@angular/core';
import { DatePicker } from 'capacitor-datepicker';
@Component({
  selector: 'app-proceso-migracion',
  templateUrl: './proceso-migracion.page.html',
  styleUrls: ['./proceso-migracion.page.scss'],
})
export class ProcesoMigracionPage implements OnInit {

  @Input() titulo: string;
   myDate: string;
  constructor() { }

  ngOnInit() {
  }

  async selectedDate(){
    const picker = new DatePicker();
    const current = new Date();

    const response = await picker.show({
      mode: 'date',
      date: current.toISOString(), //  ISO 8601 datetime format
      theme: 'AppDialogTheme', // Android theme name uses 'DialogTheme' as the default,
      // min: current.toISOString(), // available for date mode
      // max: new Date(current.getTime() + (86400 *1000 * 2)).toISOString(), // available for date mode
      title:'Choose A date yo',
      okText: 'DO IT',
      cancelText: 'NAH',
      okButtonColor: 'green',
      cancelButtonColor: 'red',
      titleTextColor: 'black', // IOS only
      titleBgColor: 'green', // IOS only
      is24Hours: false // available for time mode
  });

  this.myDate = response.value;
  }

  doSubmit(form){
    console.log(form);
  }
}
