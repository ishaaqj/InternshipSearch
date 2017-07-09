/**
 * Created by ishaaq on 7/6/2017.
 */

import {NgModule} from "@angular/core";
import {MdButtonModule, MdCardModule, MdInputModule, MdToolbarModule} from "@angular/material";
import {FlexLayoutModule} from '@angular/flex-layout'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
@NgModule({
  imports: [
    MdButtonModule,
    FlexLayoutModule,
    MdCardModule,
    MdToolbarModule,
    MdInputModule,
    BrowserAnimationsModule
  ],
  exports: [
    MdButtonModule,
    FlexLayoutModule,
    MdCardModule,
    MdToolbarModule,
    MdInputModule,
    BrowserAnimationsModule
  ]
})

export class AppMaterialModule {}
