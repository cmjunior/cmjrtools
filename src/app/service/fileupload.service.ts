import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  private URL = `${environment.api}/api/uploadxml`

  constructor(private httpClient: HttpClient) { }

  pushUpload(file, cnpjEmpresa?) {
    let body = new FormData
    body.set('xml', file)
    if ( cnpjEmpresa ) {
      body.set('cnpjEmpresa', cnpjEmpresa);
    }

    return this.httpClient.post(`${this.URL}`, body)
      .pipe(map( result =>  result))
    
  }
}