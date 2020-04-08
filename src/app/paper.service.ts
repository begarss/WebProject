import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {IComplaint} from '../../../../Downloads/complaint_3/src/app/complaint'
@Injectable({
  providedIn: 'root'
})
export class PaperService {
  private url: string = "assets/complaints.json"
  headers = {
    headers : new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http: HttpClient) { }

  getComplaint(): Observable<IComplaint[]> {
    return this.http.get<IComplaint[]>(this.url)
  }

  create(complaint): Observable<IComplaint>{
    return this.http.post<IComplaint>(this.url, complaint, this.headers)
  }
}
