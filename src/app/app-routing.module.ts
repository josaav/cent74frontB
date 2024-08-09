import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ExamenComponent } from './examen/examen.component';
import { CursadasComponent } from './cursadas/cursadas.component';

const routes: Routes = [
  { path: 'cursada/:id', component: CursadasComponent },
  { path: '', redirectTo: '/cursada/1', pathMatch: 'full' }, // Ruta por defecto para pruebas
  { path: 'examen/1', component: ExamenComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
