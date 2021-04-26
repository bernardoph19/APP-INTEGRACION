import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  
  //private _storage: Storage | null = null;
  public _storage : Storage;

  constructor(
    private storage: Storage
  ) {
    this.init();

  }

/*   async getStorage() : Promise<Storage> {
    if (this._storage != null)  return this._storage;
    this._storage = await this.init();
    return this._storage;
  } */

  async init() {    
    const storage = await this.storage.create();
    this._storage = storage;
    return storage;
  }
  
  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  async get(key: string)  {

    const r = await this.init();

    if (r != null){
      
      const result = await this._storage?.get(key);

      if (result !== null || result !== undefined) {
        return result;
      }
      
      return null;
    }
    
  }

  async getToken( key : string) {
 
    const r = await this.init();

    if (r != null){

      const result = await this._storage?.get(key);      

      if (result != null || result != undefined) {
        return result.token;
      }
    
      return null;      
    }

  }

  async clearAllStorage() {
    await this._storage?.clear();
  }
}
