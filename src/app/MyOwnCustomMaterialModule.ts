/**
 * Created by ishaaq on 7/6/2017.
 */

import {NgModule} from "@angular/core";
import {
  MdButtonModule, MdCardModule, MdGridListModule, MdIconModule, MdInputModule,
  MdToolbarModule
} from "@angular/material";
import {FlexLayoutModule} from '@angular/flex-layout'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
@NgModule({
  imports: [
    MdButtonModule,
    FlexLayoutModule,
    MdIconModule,
    MdCardModule,
    MdToolbarModule,
    MdInputModule,
    BrowserAnimationsModule,
    MdGridListModule
  ],
  exports: [
    MdButtonModule,
    FlexLayoutModule,
    MdCardModule,
    MdIconModule,
    MdToolbarModule,
    MdInputModule,
    BrowserAnimationsModule,
    MdGridListModule
  ]
})

export class AppMaterialModule {}
