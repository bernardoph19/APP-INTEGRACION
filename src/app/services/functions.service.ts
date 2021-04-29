import { Injectable } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
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

}
