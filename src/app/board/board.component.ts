import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: any = [];
  pipeline_colors: {[pipeline_name : string] : string;}
  color_class: any = ["secondary","warning","info","primary","success","danger"];

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.boardService.getBoard().subscribe(board => {
      board.forEach((pipeline,i) => {
        pipeline.pipeline_colors = this.color_class[i];
        pipeline.issues.forEach(issue => {
          this.filterBody(issue);
          this.boardService.getComments(issue.number).subscribe(comments => {
            issue.comments = comments.filter(this.filterComments);
          });
        });
      });
      this.board = board;
    });
  }


    private filterBody(issue: any) {
        if(!issue.body.includes("🐙")) {
          issue.body = "";
        }
    }

    private filterComments(comments: any) {
      return comments.body.includes("🐙");
    }
}
