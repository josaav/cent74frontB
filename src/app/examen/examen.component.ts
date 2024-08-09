import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  searchTerm: string = '';
  searchResults: any[] = [];
  selectedResult: any = null;
  materias: any[] = [];
  selectedMateriaId: number = 1;
  alumnosAgregados: any[] = [];
  errores: string[] = [];
  alumnoAgregado: boolean = false;

  searchTermDocente: string = '';
  searchResultsDocente: any[] = [];
  selectedResultDocente: any = null;
  docentesAgregados: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchMaterias().subscribe(materias => {
      this.materias = materias;
    });
  }

  fetchMaterias(): Observable<any[]> {
    const url = 'https://cent74test-d5bzb6b5aqh9haen.eastus-01.azurewebsites.net/api/Materia/Plan/1';
    return this.http.get<any>(url).pipe(
      switchMap(response => of(response.data)),
      catchError(error => {
        console.error('Error fetching materias', error);
        return of([]);
      })
    );
  }

  onSearchTermChange() {
    if (this.searchTerm.length >= 3) {
      this.fetchResults(this.searchTerm).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }

  fetchResults(term: string): Observable<any[]> {
    const url = `https://cent74test-d5bzb6b5aqh9haen.eastus-01.azurewebsites.net/api/Alumno/buscar?criterio=${term}`;
    return this.http.get<any>(url).pipe(
      debounceTime(300),
      switchMap(response => of(response.data)),
      catchError(error => {
        console.error('Error fetching results', error);
        return of([]);
      })
    );
  }

  onSelectResult(result: any) {
    this.selectedResult = result;
    this.searchTerm = `${result.apellidos}, ${result.nombres}`;
    this.searchResults = [];
    this.alumnoAgregado = false;
  }

  onAddAlumno() {
    if (!this.selectedResult || !this.selectedMateriaId) {
      return;
    }

    const alumnoId = this.selectedResult.id;
    const materiaId = this.selectedMateriaId;
    const url = `https://cent74test-d5bzb6b5aqh9haen.eastus-01.azurewebsites.net/api/Alumno/ChequearAlumnoCursada/?alumno=${alumnoId}&materia=${materiaId}`;

    this.http.get<any>(url).subscribe(response => {
      if (response.status === 200 && response.data.length === 0) {
        this.alumnosAgregados.push(this.selectedResult);
        this.alumnoAgregado = true;
        this.errores = [];
      } else {
        this.errores = response.data;
      }
    }, error => {
      console.error('Error checking alumno cursada', error);
      this.errores = ['Error al verificar el alumno.'];
    });
  }

  onRemoveAlumno(index: number) {
    this.alumnosAgregados.splice(index, 1);
  }

  // Métodos para el buscador de docentes
  onSearchTermDocenteChange() {
    if (this.searchTermDocente.length >= 3) {
      this.fetchResultsDocente(this.searchTermDocente).subscribe(results => {
        this.searchResultsDocente = results;
      });
    } else {
      this.searchResultsDocente = [];
    }
  }

  fetchResultsDocente(term: string): Observable<any[]> {
    const url = `https://cent74test-d5bzb6b5aqh9haen.eastus-01.azurewebsites.net/api/Docente/buscar?criterio=${term}`;
    return this.http.get<any>(url).pipe(
      debounceTime(300),
      switchMap(response => of(response.data)),
      catchError(error => {
        console.error('Error fetching results', error);
        return of([]);
      })
    );
  }

  onSelectResultDocente(result: any) {
    this.selectedResultDocente = result;
    this.searchTermDocente = `${result.apellidos}, ${result.nombres}`;
    this.searchResultsDocente = [];
  }

  onAddDocente() {
    if (this.selectedResultDocente) {
      this.docentesAgregados.push(this.selectedResultDocente);
      this.selectedResultDocente = null;
      this.searchTermDocente = '';
    }
  }

  onRemoveDocente(index: number) {
    this.docentesAgregados.splice(index, 1);
  }

  redirigir() {
    this.router.navigate(['/exito']);
  }

  clearErrors() {
    this.errores = [];
  }
}

