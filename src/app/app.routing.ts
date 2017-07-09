import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
/**
 * Created by ishaaq on 7/6/2017.
 */

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent}
];

export const Approutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
