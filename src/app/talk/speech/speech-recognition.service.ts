import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

interface Dialect {
    name: string;
    code: string;
}

interface SpeachLanguage {
    name: string;
    dialects: Array<Dialect>;
}

@Injectable()
export class SpeechRecognitionService {
    speechRecognition: any;
    speechLanguages: Array<SpeachLanguage> = [
        {name: 'Afrikaans', dialects: [{name: 'Afrikaans', code: 'af-ZA'}]},
        {name: 'Bahasa Indonesia', dialects: [{name: 'Bahasa Indonesia', code: 'id-ID'}]},
        {name: 'Bahasa Melayu', dialects: [{name: 'Bahasa Melayu', code: 'ms-MY'}]},
        {name: 'Català', dialects: [{name: 'Català', code: 'ca-ES'}]},
        {name: 'Čeština', dialects: [{name: 'Čeština', code: 'cs-CZ'}]},
        {name: 'Deutsch', dialects: [{name: 'Deutsch', code: 'de-DE'}]},
        {
            name: 'English', dialects: [
            {name: 'Australia', code: 'en-AU'},
            {name: 'Canada', code: 'en-CA'},
            {name: 'India', code: 'en-IN'},
            {name: 'New Zealand', code: 'en-NZ'},
            {name: 'South Africa', code: 'en-ZA'},
            {name: 'United Kingdom', code: 'en-GB'},
            {name: 'United States', code: 'en-US'}
            ]
        },
        {
            name: 'Español', dialects: [
            {name: 'Argentina', code: 'es-AR'},
            {name: 'Bolivia', code: 'es-BO'},
            {name: 'Chile', code: 'es-CL'},
            {name: 'Colombia', code: 'es-CO'},
            {name: 'Costa Rica', code: 'es-CR'},
            {name: 'Ecuador', code: 'es-EC'},
            {name: 'El Salvador', code: 'es-SV'},
            {name: 'España', code: 'es-ES'},
            {name: 'Estados Unidos', code: 'es-US'},
            {name: 'Guatemala', code: 'es-GT'},
            {name: 'Honduras', code: 'es-HN'},
            {name: 'México', code: 'es-MX'},
            {name: 'Nicaragua', code: 'es-NI'},
            {name: 'Panamá', code: 'es-PA'},
            {name: 'Paraguay', code: 'es-PY'},
            {name: 'Perú', code: 'es-PE'},
            {name: 'Puerto Rico', code: 'es-PR'},
            {name: 'República Dominicana', code: 'es-DO'},
            {name: 'Uruguay', code: 'es-UY'},
            {name: 'Venezuela', code: 'es-VE'}
            ],
        },
        {name: 'Euskara', dialects: [{name: 'Euskara', code: 'eu-ES'}]},
        {name: 'Français', dialects: [{name: 'Français', code: 'fr-FR'}]},
        {name: 'Galego', dialects: [{name: 'Galego', code: 'gl-ES'}]},
        {name: 'Hrvatski', dialects: [{name: 'Hrvatski', code: 'hr_HR'}]},
        {name: 'IsiZulu', dialects: [{name: 'IsiZulu', code: 'zu-ZA'}]},
        {name: 'Íslenska', dialects: [{name: 'Íslenska', code: 'is-IS'}]},
        {name: 'Italiano', dialects: [
            {name: 'Italia', code: 'it-IT'},
            {name: 'Svizzera', code: 'it-CH'},
            ]
        },
        {name: 'Magyar', dialects: [{name: 'Magyar', code: 'hu-HU'}]},
        {name: 'Nederlands', dialects: [{name: 'Nederlands', code: 'nl-NL'}]},
        {name: 'Norsk bokmål', dialects: [{name: 'Norsk bokmål', code: 'nb-NO'}]},
        {name: 'Polski', dialects: [{name: 'Polski', code: 'pl-PL'}]},
        {name: 'Português', dialects: [
            {name: 'Brasil', code: 'pt-BR'},
            {name: 'Portugal', code: 'pt-PT'}
            ]
        },
        {name: 'Română', dialects: [{name: 'Română', code: 'ro-RO'}]},
        {name: 'Slovenčina', dialects: [{name: 'Slovenčina', code: 'sk-SK'}]},
        {name: 'Suomi', dialects: [{name: 'Suomi', code: 'fi-FI'}]},
        {name: 'Svenska', dialects: [{name: 'Svenska', code: 'sv-SE'}]},
        {name: 'Türkçe', dialects: [{name: 'Türkçe', code: 'tr-TR'}]},
        {name: 'български', dialects: [{name: 'български', code: 'bg-BG'}]},
        {name: 'Pусский', dialects: [{name: 'Pусский', code: 'ru-RU'}]},
        {name: 'Српски', dialects: [{name: 'Српски', code: 'sr-RS'}]},
        {name: '한국어', dialects: [{name: '한국어', code: 'ko-KR'}]},
        {
            name: '中文', dialects: [
            {name: '普通话 (中国大陆)', code: 'cmn-Hans-CN'},
            {name: '普通话 (香港)', code: 'cmn-Hans-HK'},
            {name: '中文 (台灣)', code: 'cmn-Hant-TW'},
            {name: '粵語 (香港)', code: 'yue-Hant-HK'},
            ]
        },
        {name: '日本語', dialects: [{name: '日本語', code: 'ja-JP'}]},
        {name: 'Lingua latīna', dialects: [{name: 'Lingua latīna', code: 'la'}]}
    ];

    constructor(private zone: NgZone) {
    }

    record(lang:string): Observable<string> {

        return Observable.create(observer => {
            const { webkitSpeechRecognition }: IWindow = <IWindow>window;
            this.speechRecognition = new webkitSpeechRecognition();
            this.speechRecognition.continuous = false;
            //this.speechRecognition.interimResults = true;
            this.speechRecognition.lang = lang;
            this.speechRecognition.maxAlternatives = 1;

            this.speechRecognition.onresult = speech => {
                let term: string = "";
                console.log(speech);
                if (speech.results) {
                    var result = speech.results[speech.resultIndex];
                    var transcript = result[0].transcript;
                    if (result.isFinal) {
                        if (result[0].confidence < 0.3) {
                            console.log("Unrecognized result - Please try again");
                        }
                        else {
                            term = _.trim(transcript);
                            console.log("Did you said? -> " + term + " , If not then say something else...");
                        }
                    }
                }
                this.zone.run(() => {
                    observer.next(term);
                });
            };

            this.speechRecognition.onerror = error => {
                this.zone.run(() => {
                    observer.error(error);
                });
            };
            this.speechRecognition.onend = () => {
                this.zone.run(() => {
                    observer.complete();
                });
            };

            this.speechRecognition.start();
        });
    }
    stop() {
        if (this.speechRecognition) {
            this.speechRecognition.stop();
        }
    }
    DestroySpeechObject() {
        if (this.speechRecognition)
            this.speechRecognition.stop();
    }

}