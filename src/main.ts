// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from "@angular/platform-browser";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { appConfig } from "./app/app.config";
import { App } from "./app/app";


bootstrapApplication (App, {
  providers : [
    provideHttpClient()
  ]
});
