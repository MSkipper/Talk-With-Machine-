import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthorsComponent } from './authors/authors.component';
import { AboutComponent } from './about/about.component';
import { TalkComponent } from './talk/talk.component';
import { RouterModule, Routes } from '@angular/router';
import { SpeechComponent } from './talk/speech/speech.component';
import { ChatComponent } from './talk/chat/chat.component';

const appRoutes: Routes = [
  { path: 'talk', component: TalkComponent },
  { path: 'about',component: AboutComponent },
  { path: 'authors', component: AuthorsComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthorsComponent,
    AboutComponent,
    TalkComponent,
    SpeechComponent,
    ChatComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
