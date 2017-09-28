import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BoardService {

  constructor(private http: Http) { }
  getBoard() {
    return this.http.get('/api/v1/board/pipelines')
      .map(res => res.json());
    }
  getComments(issue_id){
    return this.http.get(`/api/v1/board/${issue_id}/comments`)
    .map(res => res.json());
  }
}
