// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let devUrl = 'http://192.168.1.173';

export const environment = {
  PRODUCTION: false,

  URLS: {
    ANEXOS: `${devUrl}:3000`,
    AUTH: `${devUrl}:3001/api/v01`,
    MEDICINA: `${devUrl}:3003/api/v01`,
    LABORATORIO: `${devUrl}:3002/api/v01`,
    OPTOMETRIA: `${devUrl}:3004/api/v01`,
    PSICOLOGIA: `${devUrl}:3005/api/v01`,
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
