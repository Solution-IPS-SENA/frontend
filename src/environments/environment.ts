// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let devUrl = 'http://localhost';

// export const environment = {
//   PRODUCTION: false,

//   SECRET:"gurXOPwbbe91h2GeS3cT4zNw9kM4HQlZ4MZ_l1-p1GIkDjn8FcTvNtlRgBY3yqQ-dOtuZy6tBIYTqTXgzDqkvhViYrxW4WtvYXkrkCRify-OOaJ8aWWbltiK4m2YlgDdgd1uwwr2X3iyM8i8S5L0QShCa2_0Aqcffikl_XOK0qaw7lL8wJgm_qGlB8gjVdxN2Ctq7-cb3IJd4DikOEfm4CjgnzbgzdQ0CCJ_AdBOYNO6FSVP-wxgcKoPkDemyIQx4rvAUVH7heoB-cqThw3dMwbat3Uefkkla1TirdAJHBRm8N7BzXRzKsnO_DkSWR9-dhtgWSJXI8nQVA4kMreFMw",

//   URLS: {
//     ANEXOS: "http://valores_microservice_sips:3000",
//     AUTH: "http://auth_microservice_sips:3000/api/v01",
//     MEDICINA: 'http://medicina_microservice_sips:3000/api/v01',
//     LABORATORIO: 'http://laboratorio_microservice_sips:3000/api/v01',
//     OPTOMETRIA: 'http://optometria_microservice_sips:3000/api/v01',
//     PSICOLOGIA: 'http://psicologia_microservice_sips:3000/api/v01',
//   },

//   ENDPOINTS: {
//     LOGIN: '/login',
//     REGISTER: '/register/paciente',
//     QUERY_PACIENTE:'/paciente',
//     HISTORIA_PSICOLOGIA:'/historia_psicologia',
//     HISTORIA_MEDICA:'/historia_psicologia',
//     HISTORIA_OPTOMETRIA:'/historia_optometria',
//     HISTORIA_LABORATORIO:'/historia_laboratorio',
//   }
// };


export const environment = {
  PRODUCTION: false,

  SECRET:"gurXOPwbbe91h2GeS3cT4zNw9kM4HQlZ4MZ_l1-p1GIkDjn8FcTvNtlRgBY3yqQ-dOtuZy6tBIYTqTXgzDqkvhViYrxW4WtvYXkrkCRify-OOaJ8aWWbltiK4m2YlgDdgd1uwwr2X3iyM8i8S5L0QShCa2_0Aqcffikl_XOK0qaw7lL8wJgm_qGlB8gjVdxN2Ctq7-cb3IJd4DikOEfm4CjgnzbgzdQ0CCJ_AdBOYNO6FSVP-wxgcKoPkDemyIQx4rvAUVH7heoB-cqThw3dMwbat3Uefkkla1TirdAJHBRm8N7BzXRzKsnO_DkSWR9-dhtgWSJXI8nQVA4kMreFMw",

  URLS: {
    ANEXOS: `${devUrl}:3700`,
    AUTH: `${devUrl}:3701/api/v01`,
    MEDICINA: `${devUrl}:3703/api/v01`,
    LABORATORIO: `${devUrl}:3702/api/v01`,
    OPTOMETRIA: `${devUrl}:3704/api/v01`,
    PSICOLOGIA: `${devUrl}:3705/api/v01`,
  },

  ENDPOINTS: {
    LOGIN: '/login',
    REGISTER: '/register/paciente',
    QUERY_PACIENTE:'/paciente',
    HISTORIA_PSICOLOGIA:'/historia_psicologia',
    HISTORIA_MEDICA:'/historia_medica',
    HISTORIA_OPTOMETRIA:'/historia_optometria',
    HISTORIA_LABORATORIO:'/historia_laboratorio',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
