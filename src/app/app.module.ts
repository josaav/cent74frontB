import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ExamenComponent } from './examen/examen.component';
import { CursadasComponent } from './cursadas/cursadas.component';
import { ExitoComponent } from './exito/exito.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamenComponent,
    CursadasComponent,
    ExitoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
