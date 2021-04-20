import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private _storage: Storage | null = null;


  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    try {

      const result = await this._storage?.get(key);
      console.log('storageGET: ' + key + ': ' + result);

      if (result != null) {
        return result;
      }
      
      return null;

    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  async getToken( key : string) {
    try {

      const result = await this._storage?.get(key);
      console.log('storage GET TOKEN : ' + key + ': ' + result);

      if (result != null) {
        return result.token;
      }
      
      return null;

    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  async clearAllStorage() {
    await this._storage?.clear();
  }
}
