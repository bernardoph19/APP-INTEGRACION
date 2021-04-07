import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-mostrar-comprobantes',
  templateUrl: './mostrar-comprobantes.page.html',
  styleUrls: ['./mostrar-comprobantes.page.scss'],
})
export class MostrarComprobantesPage implements OnInit {

  constructor(private _ngZone: NgZone) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
  }

}

