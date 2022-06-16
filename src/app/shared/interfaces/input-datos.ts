export interface InputDatos {
    id?: string,
    nombre?: string,
    type?: string,
    for?: string,
    for2?: string,
    img?: string,
    value?: string,
    options?: OpcionesSelect[]
    options2?: OpcionesSelect[]
    options3?: OpcionesSelect[]
}

interface OpcionesSelect {
    valor: string,
    nombre: string
}
