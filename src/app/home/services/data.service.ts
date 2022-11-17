import { Injectable } from '@angular/core';
import { Quote } from 'src/app/models/Quote';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<Quote[]>(`https://programming-quotes-api.herokuapp.com/Quotes?count=10`)
  }
}
