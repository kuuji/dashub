import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: any = [];
  closed_issues: any = [];

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.boardService.getBoard().subscribe(board => {
      this.board = board;
    });
    this.boardService.getClosedIssues().subscribe(issues => {
      this.closed_issues = issues;
    });
  }

}
