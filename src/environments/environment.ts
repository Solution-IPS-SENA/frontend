// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  PRODUCTION: false,

  URLS: {
    ANEXOS: "http://localhost:5000",
    AUTH: "http://10.199.0.61:3000/api/v01",
    MEDICINA: 'http://10.199.0.61:3000/api/v01',
    LABORATORIO: 'http://10.199.0.61:3000/api/v01',
    OPTOMETRIA: 'http://10.199.0.61:3000/api/v01',
    PSICOLOGIA: 'http://10.199.0.61:3000/api/v01',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
