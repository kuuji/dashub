import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';

import { BoardService } from './board.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: 'board',
    component: BoardComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    MarkdownToHtmlModule.forRoot(),
  ],
  providers: [BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
