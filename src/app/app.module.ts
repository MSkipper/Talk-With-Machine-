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
import { SpeechRecognitionService } from './talk/speech/speech-recognition.service';
import {CollapseDirective} from "ng2-bootstrap";
import {NgNotifyPopup} from "ng2-notify-popup/dist";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    ChatComponent,
    CollapseDirective
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgNotifyPopup,
    BrowserAnimationsModule
  ],
  providers: [
    SpeechRecognitionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
