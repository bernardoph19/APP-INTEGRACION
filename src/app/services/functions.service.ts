import { Injectable } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File as ionFile} from '@ionic-native/file/ngx';

import * as XLSX from 'xlsx';
import *  as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private dataStorage : DataStorageService,
    private file                : ionFile,
    private fileOpener          : FileOpener,
  ) { }

  async _headersApi(): Promise<any> {
    
    const token = await this.dataStorage.getToken('login');    
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIyMDM1NTE2NjU0NyIsImlhdCI6MTYxODUxODY0OSwiZXhwIjoxNjE4NTYxODQ5fQ.lJjW94usCw9XvsqlnrK8bynmjvuvWHlN23QCxqasdfare';
    return { 'Authorization': `bearer ${token}` }
  }

  convertFecha(fecha: string) {

    const dat = new Date(fecha);
    const dia = dat.getDate();
    const mes = dat.getMonth() + 1;
    const año = dat.getFullYear();

    if (mes < 10) fecha = `${año}-0${mes}-${dia}`;
    else fecha = `${año}-${mes}-${dia};`
    return fecha;
  }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  downloadFile(blob, nameArchivo) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob);
    }
    const linkElement = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', nameArchivo);
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    linkElement.dispatchEvent(clickEvent);
  }

  exportToExcel(json: any, excelFileName: string): void {

    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workBook: XLSX.WorkBook = { Sheets: { 'data': workSheet }, SheetNames: ['data'] };
    const excelbuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcel(excelbuffer, excelFileName);

  }

  private saveAsExcel(buffer: any, FileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, FileName + EXCEL_EXT);
  }

  /* IONIC descargar , guardar y mostrar docs  */

  crearArchivoExcel( json, excelFileName ) {

    this.file.checkFile( this.file.dataDirectory, excelFileName+EXCEL_EXT )
      .then( existe => {
        console.log('Existe archivo?');
        console.log(existe);
        return this.writeFileExcel( json, excelFileName);
      })
      .catch( err => {

        return this.file.createFile( this.file.dataDirectory, `${excelFileName}${EXCEL_EXT}`, false )
                .then( creado =>{ 
                    console.log('creadon el archivo');
                    this.writeFileExcel( json, excelFileName );
                })
                .catch( err2 => {
                  console.log( 'No se pudo crear el archivo' ); 
                  console.log(JSON.stringify(err2))
                });
      });
  }

  private jsonToBufferExcelIonic(json: any, excelFileName: string)  {

    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workBook: XLSX.WorkBook = { Sheets: { 'data': workSheet }, SheetNames: ['data'] };
    const excelbuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
    const r = this.bufferToBlobExcelIonic(excelbuffer, excelFileName);
    return r;

  }

  private bufferToBlobExcelIonic(buffer: any, FileName: string) {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    return data;
  }
  

  private crearArchivoCSV( text: string, name_file : string ) {

    this.file.checkFile( this.file.dataDirectory, name_file+'.csv' )
      .then( existe => {
        console.log('Existe archivo?');
        console.log(existe);
        return this.escribirEnArchivoCSV( text, name_file);
      })
      .catch( err => {

        return this.file.createFile( this.file.dataDirectory, name_file+'.csv', false )
                .then( creado => this.escribirEnArchivoCSV( text, name_file ) )
                .catch( err2 => {
                  console.log( 'No se pudo crear el archivo' ); 
                  console.log(JSON.stringify(err2))
                });
      });
  }

  private async escribirEnArchivoCSV( text: string, name_file : string) {
    

    await this.file.writeExistingFile( this.file.dataDirectory, name_file+'.csv', text );

    const archivo = `${this.file.dataDirectory}/${name_file}.csv`;
    
    this.fileOpener.open(archivo, 'text/csv')
        .then(() => console.log('File is opened'))
        .catch(error => {
          console.log('Error openening file');
          console.log(JSON.stringify(error));
        });

  }

  
  private async writeFileExcel(json, excelFileName) {

    const bs = this.jsonToBufferExcelIonic(json, excelFileName) 


    await this.file.writeExistingFile( this.file.dataDirectory, `${excelFileName}${EXCEL_EXT}`, bs );

    const archivo = `${this.file.dataDirectory}/${excelFileName}${EXCEL_EXT}`;

    this.fileOpener.open(archivo, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    .then(() => console.log('File is opened'))
    .catch(error => {
      console.log('Error openening file');
      console.log(JSON.stringify(error));
    });
  }
  

  /* CONVERTIR JSON A TEXT PARA CREAR ARCHIVO CSV IONIC */  // Alternativo

  convertJSONtoText( data : any,  name_file : string) {
    const arrTemp = [];
    const titulos = 'CUO, FECHA EMISION, FECHA VENCIMIENTO, TIPO, SERIE, NUMERO, CODIGO CLIENTE, RUC O DNI, RAZON SOCIAL & NOMBRE, EXPORTACION, GRAVADAS, EXONERADAS, INAFECTO, ISC, IGV, OTROS TRIBUTOS, TOTAL, TIPO MONEDA, TIPO DOCUMENTO RELACIONADO, SERIE RELACIONADA, NUMERO RELACIONADO, IDEnviado, IDAnuladoEnviado\n';

    arrTemp.push( titulos );

    data.forEach( r => {

      const fechaVenci  = (r['FECHA VENCIMIENTO'] == '' )            ? '-' :  r['FECHA VENCIMIENTO'];
      const nRelaciondo = (r['NÚMERO RELACIONADO'] == '' )           ? '-' :  r['NÚMERO RELACIONADO'];
      const sRelaciondo = (r['SERIE RELACIONADA'] == '' )            ? '-' :  r['SERIE RELACIONADA'];
      const tdRelacion  = (r['TIPO DOCUMENTO RELACIONADO'] ==  '' )  ? '-' :  r['TIPO DOCUMENTO RELACIONADO'];

      const linea = `${ r['CUO'] }, ${ r['FECHA EMISIÓN'] }, ${ fechaVenci }, ${ r['TIPO'] }, ${ r['SERIE'] }, ${ r['NÚMERO'] }, ${ r['CODIGO CLIENTE'] }, ${ r['RUC O DNI'] }, ${ r['RAZÓN SOCIAL & NOMBRE'] }, ${ r['EXPORTACIÓN'] }, ${ r['GRAVADAS'] }, ${ r['EXONERADAS'] }, ${ r['INAFECTO'] }, ${ r['ISC'] }, ${ r['IGV'] }, ${ r['OTROS TRIBUTOS'] }, ${ r['TOTAL']}, ${ r['TIPO MONEDA'] },  ${ tdRelacion },  ${ sRelaciondo }, ${nRelaciondo}, ${ r['IDEnviado']}, ${ r['IDAnuladoEnviado'] }\n`;

      arrTemp.push( linea );      

    });

    console.log(arrTemp);
    this.crearArchivoCSV( arrTemp.join('') , name_file );

  }


}
