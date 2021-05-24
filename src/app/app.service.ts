import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer keyuBQAHY3Bb2X2VR`
    })
  }

  getPropertyList() {
    return this.http.get<any>("https://api.airtable.com/v0/appLdaWZXgUkYKGYS/Table%201", { headers: this.getHeader() })
  }
  addProperty(data) {
    let t = {
      "records": [
        {
          "fields": data
        }
      ]
    }
    console.log(t)

    return this.http.post<any>("https://api.airtable.com/v0/appLdaWZXgUkYKGYS/Table%201", t, { headers: this.getHeader() })
  }
  deleteProperty(id){
    return this.http.delete<any>("https://api.airtable.com/v0/appLdaWZXgUkYKGYS/Table%201"+ "/" + id, { headers: this.getHeader() })
  }
}
