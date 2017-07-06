import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ModuleWithProviders} from "@angular/core";
/**
 * Created by ishaaq on 7/6/2017.
 */

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent}
];

export const Approutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
