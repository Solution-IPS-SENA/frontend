type DocumentoAnexo = {
  abreviacion: string,
  completo: string
}

type PaisAnexo = {
  iso: string,
  pais: string
}

export interface InformacionAnexos {
    tipoDocumento?:DocumentoAnexo[];
    normalidad?: string[];
    sino?: string[];
    referencia?: string[];
    aprobacion?: string[];
    antecedentesFamiliares?: string[];
    equiposUtilizados?: string[];
    remitido?: string[];
    larsen?: string[];
    hz?: string[];
    weber?: string[];
    conducto?: string[];
    membrana?: string[];
    agudezaVisual?: string[];
    tiempo?: string[];
    lensometria?: string[];
    factura?: string[];
    valorFactura?: string[];
    patologicos?: string[];
    ets?: string[];
    nroVacuna?: string[];
    adecuacion?: string[];
    carga?: string[];
    medioAmbiente?: string[];
    institucion?: string[];
    riesgosLaborales?: string[];
    fisico?: string[];
    biologico?: string[];
    quimico?: string[];
    seguridad?: string[];
    biomecanico?: string[];
    psicosocial?: string[];
    eps?: string[];
    arl?: string[];
    afp?: string[];
    genero?: string[];
    lugarDeNacimiento?: string[];
    nacionalidad?: PaisAnexo[];
    paises?: string[];
    motivo?: string[];
    concepto?: string[];
    conceptoF?: string[];
    recomendacionesF?: string[];
    areaSolicitante?: string[];
    remitidoA?: string[];
}
