
import { NgModule} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule, components } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';




@NgModule({
  declarations: [
    AppComponent,
    components

  ],
  imports: [
    
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    

  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
