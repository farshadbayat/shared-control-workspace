import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  public upload(formData, serverUrl) {

    return this.httpClient.post<any>(serverUrl, formData, {
        reportProgress: true,
        observe: 'events',
        responseType: 'json'
      });
  }

}
