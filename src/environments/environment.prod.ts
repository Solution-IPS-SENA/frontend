export const environment = {
  PRODUCTION: true,

  SECRET:"gurXOPwbbe91h2GeS3cT4zNw9kM4HQlZ4MZ_l1-p1GIkDjn8FcTvNtlRgBY3yqQ-dOtuZy6tBIYTqTXgzDqkvhViYrxW4WtvYXkrkCRify-OOaJ8aWWbltiK4m2YlgDdgd1uwwr2X3iyM8i8S5L0QShCa2_0Aqcffikl_XOK0qaw7lL8wJgm_qGlB8gjVdxN2Ctq7-cb3IJd4DikOEfm4CjgnzbgzdQ0CCJ_AdBOYNO6FSVP-wxgcKoPkDemyIQx4rvAUVH7heoB-cqThw3dMwbat3Uefkkla1TirdAJHBRm8N7BzXRzKsnO_DkSWR9-dhtgWSJXI8nQVA4kMreFMw",

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
