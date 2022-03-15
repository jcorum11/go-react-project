import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserVideo } from './user-video';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }

  getVideos(): Observable<UserVideo[]> {
    return this.http.get<UserVideo[]>(`${environment.apiBaseUrl}/videos`);
  }

  upload(file: File): Observable<UserVideo> {
    const formData = new FormData()
    formData.append('video', file, file.name);

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.post<UserVideo>(`${environment.apiBaseUrl}/videos`, formData, {headers});
  }
}
