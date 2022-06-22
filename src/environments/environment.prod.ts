export const environment = {
  PRODUCTION: true,
  URLS: {
    ANEXOS: "valores_microservice_sips:3000",
    AUTH: "auth_microservice_sips:3000/api/v01",
    MEDICINA: 'medicina_microservice_sips:3000/api/v01',
    LABORATORIO: 'laboratorio_microservice_sips:3000/api/v01',
    OPTOMETRIA: 'optometria_microservice_sips:3000/api/v01',
    PSICOLOGIA: 'psicologia_microservice_sips:3000/api/v01',
  },

  ENDPOINTS: {
    LOGIN: '/login',
    QUERY_PACIENTE:'/paciente',
    HISTORIA_PSICOLOGIA:'/historia_psicologia',
    HISTORIA_MEDICA:'/historia_psicologia',
    HISTORIA_OPTOMETRIA:'/historia_optometria',
    HISTORIA_LABORATORIO:'/historia_laboratorio',
  }
};
