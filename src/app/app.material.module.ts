/**
 * Created by ishaaq on 7/6/2017.
 */

import {NgModule} from "@angular/core";
import {MdButtonModule, MdCardModule, MdInputModule, MdToolbarModule} from "@angular/material";
import {FlexLayoutModule} from '@angular/flex-layout'
@NgModule({
  imports: [
    MdButtonModule,
    FlexLayoutModule,
    MdCardModule,
    MdToolbarModule,
    MdInputModule
  ],
  exports: [
    MdButtonModule,
    FlexLayoutModule,
    MdCardModule,
    MdToolbarModule,
    MdInputModule
  ]
})

export class AppMaterialModule {}
