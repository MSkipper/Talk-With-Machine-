import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';
import {NotificationService} from "ng2-notify-popup/dist";

@Component({
  selector: 'mt-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css'],
  providers: [NotificationService]
})

export class SpeechComponent implements OnInit, OnDestroy {
  @Output() messageCallback = new EventEmitter();
  @Output() speakCallback = new EventEmitter();
  recording: boolean;
  selectedDialect: string;

  constructor(private speechRecognitionService: SpeechRecognitionService, private notify: NotificationService) {
    this.recording = false;
    this.selectedDialect = "pl-PL"
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.recording = false;
    this.speechRecognitionService.stop();
    this.speechRecognitionService.DestroySpeechObject();
  }

  stopSpeach(): void {
    this.speechRecognitionService.stop();
    this.recording = false;
  }

  activateSpeech(): void {
    this.recording = true;

    this.speechRecognitionService.record(this.selectedDialect)
        .subscribe(
            (value) => {
              if (value.length) {
                this.messageCallback.emit({query: value});
              }
            },
            (err) => {
              console.log(err);
              if (err.error == "no-speech") {
                this.recording = false;
                this.notify.show('Nie wykryłem mowy. Wyłączam mikrofon.', { position:'top', duration: '3000', type: 'error' });
              } else {

              }
            },
            () => {
              if (this.recording) {
                this.activateSpeech();
              }
            }
        );
  }
}