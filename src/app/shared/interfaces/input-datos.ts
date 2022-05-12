export interface InputDatos {
    id: string,
    nombre: string,
    for: string,
    options?: OpcionesSelect[]
}

export interface InputDatosType {
    id: string,
    nombre: string,
    type: string,
    for: string,
    options?: OpcionesSelect[]
}

export interface InputDatosDoble {
    id: string,
    nombre: string,
    options?: OpcionesSelect[]
    options2?: OpcionesSelect[]
    options3?: OpcionesSelect[]
}

interface OpcionesSelect {
    valor: string,
    nombre: string
}
