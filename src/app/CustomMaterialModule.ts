/**
 * Created by ishaaq on 7/6/2017.
 */

import {NgModule} from "@angular/core";
import {
  MdButtonModule, MdCardModule, MdGridListModule, MdIconModule, MdInputModule, MdMenuModule, MdSortModule,
  MdTableModule,
  MdToolbarModule
} from "@angular/material";
import {FlexLayoutModule} from '@angular/flex-layout'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CdkTableModule} from "@angular/cdk";
@NgModule({
  imports: [
    MdButtonModule,
    FlexLayoutModule,
    MdIconModule,
    MdCardModule,
    MdToolbarModule,
    MdInputModule,
    BrowserAnimationsModule,
    MdGridListModule,
    MdMenuModule,
    MdTableModule,
    CdkTableModule,
    MdSortModule
  ],
  exports: [
    MdButtonModule,
    FlexLayoutModule,
    MdCardModule,
    MdIconModule,
    MdToolbarModule,
    MdInputModule,
    BrowserAnimationsModule,
    MdGridListModule,
    MdMenuModule,
    MdTableModule,
    CdkTableModule,
    MdSortModule
  ]
})

export class AppMaterialModule {}
