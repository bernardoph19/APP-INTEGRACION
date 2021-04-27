export interface IComprobante {

    ruc               : string;
    serie             : string;
    numero            : string;
    codigoComprobante : string;
    client            : string;
    produccion        : boolean;
    correo            : string;
    Cliente           : string;
    Descuento         : number;
    Detalle           : details;
    Direccion         : string;
    Exonerada         : number;
    Fecha             : string;
    Gratuita          : number;
    IDComprobante     : string;
    IGV               : number;
    Inafecta          : number;
    Moneda            : string;
    Numero            : string;
    NumeroDocumento   : string;
    Serie             : string;
    TipoComprobante   : string;
    TipoPago          : string;
    Total             : number;
    clave             : string;
  }
  
  export interface details{
  
    Afecto            : boolean;
    Bonificacion      : boolean;
    Cantidad          : number;
    Descripcion       : string;
    DocAnticipo       : string;
    Exonerado         : boolean;
    IDComprobante     : string;
    IDPresentacion    : string;
    IDProducto        : number;
    Icbper            : number;
    Inafecto          : boolean;
    Precio            : number;
    PrecioReferencial : number;
    UnidadMedida      : string;
  
  }