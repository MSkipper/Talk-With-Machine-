import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';

@Component({
  selector: 'mt-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css']
})

export class SpeechComponent implements OnInit, OnDestroy {
  @Output() messageCallback = new EventEmitter();
  @Output() speakCallback = new EventEmitter();
  recording: boolean;
  selectedDialect: string;

  constructor(private speechRecognitionService: SpeechRecognitionService) {
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
                this.speakCallback.emit({text: "Nie wykryłem mowy. Wyłączam mikrofon.", lang: "Polish Female"});
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