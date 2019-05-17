import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor(private http: HttpClient) { }

  addMessage(chatMessage: any){
    return this.http.get(`${environment.sentiment_api}/add?text=${chatMessage.message}&fromWho=${chatMessage.from}`);
  }

  getAllAnalyzedMessages(): Observable<any>{
    return this.http.get(`${environment.sentiment_api}/getAllSentiment`);
  }
}
