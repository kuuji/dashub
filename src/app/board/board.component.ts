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
      });
      this.board = board;
    });
  }

}
