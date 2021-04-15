export class ICondition {

    activo  : boolean;
    anulado : boolean;
    constructor() {
        this.activo  = true;
        this.anulado = true;
    }
}

export class IStatus {

    enviado     : boolean;
    not_enviado : boolean;
    constructor() {
        this.enviado     = true;
        this.not_enviado = true;
    }
}