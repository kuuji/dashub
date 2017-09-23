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
  getClosedIssues() {
    return this.http.get('/api/v1/board/closed-issues')
      .map(res => res.json());
    }
}
