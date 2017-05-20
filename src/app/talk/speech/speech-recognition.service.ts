import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {
    speechRecognition: any;
    langs = [
        ['Afrikaans',
            ['af-ZA']
        ],
        ['Bahasa Indonesia',
            ['id-ID']
        ],
        ['Bahasa Melayu',
            ['ms-MY']
        ],
        ['Català',
            ['ca-ES']
        ],
        ['Čeština',
            ['cs-CZ']
        ],
        ['Deutsch',
            ['de-DE']
        ],
        ['English',
            ['en-AU', 'Australia'],
            ['en-CA', 'Canada'],
            ['en-IN', 'India'],
            ['en-NZ', 'New Zealand'],
            ['en-ZA', 'South Africa'],
            ['en-GB', 'United Kingdom'],
            ['en-US', 'United States']
        ],
        ['Español',
            ['es-AR', 'Argentina'],
            ['es-BO', 'Bolivia'],
            ['es-CL', 'Chile'],
            ['es-CO', 'Colombia'],
            ['es-CR', 'Costa Rica'],
            ['es-EC', 'Ecuador'],
            ['es-SV', 'El Salvador'],
            ['es-ES', 'España'],
            ['es-US', 'Estados Unidos'],
            ['es-GT', 'Guatemala'],
            ['es-HN', 'Honduras'],
            ['es-MX', 'México'],
            ['es-NI', 'Nicaragua'],
            ['es-PA', 'Panamá'],
            ['es-PY', 'Paraguay'],
            ['es-PE', 'Perú'],
            ['es-PR', 'Puerto Rico'],
            ['es-DO', 'República Dominicana'],
            ['es-UY', 'Uruguay'],
            ['es-VE', 'Venezuela']
        ],
        ['Euskara',
            ['eu-ES']
        ],
        ['Français',
            ['fr-FR']
        ],
        ['Galego',
            ['gl-ES']
        ],
        ['Hrvatski',
            ['hr_HR']
        ],
        ['IsiZulu',
            ['zu-ZA']
        ],
        ['Íslenska',
            ['is-IS']
        ],
        ['Italiano',
            ['it-IT', 'Italia'],
            ['it-CH', 'Svizzera']
        ],
        ['Magyar',
            ['hu-HU']
        ],
        ['Nederlands',
            ['nl-NL']
        ],
        ['Norsk bokmål',
            ['nb-NO']
        ],
        ['Polski',
            ['pl-PL']
        ],
        ['Português',
            ['pt-BR', 'Brasil'],
            ['pt-PT', 'Portugal']
        ],
        ['Română',
            ['ro-RO']
        ],
        ['Slovenčina',
            ['sk-SK']
        ],
        ['Suomi',
            ['fi-FI']
        ],
        ['Svenska',
            ['sv-SE']
        ],
        ['Türkçe',
            ['tr-TR']
        ],
        ['български',
            ['bg-BG']
        ],
        ['Pусский',
            ['ru-RU']
        ],
        ['Српски',
            ['sr-RS']
        ],
        ['한국어',
            ['ko-KR']
        ],
        ['中文',
            ['cmn-Hans-CN', '普通话 (中国大陆)'],
            ['cmn-Hans-HK', '普通话 (香港)'],
            ['cmn-Hant-TW', '中文 (台灣)'],
            ['yue-Hant-HK', '粵語 (香港)']
        ],
        ['日本語',
            ['ja-JP']
        ],
        ['Lingua latīna',
            ['la']
        ]
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
                observer.complete();
            };

            this.speechRecognition.start();

            // console.log("Say something - We are listening !!!");
        });
    }
    stop() {
        this.speechRecognition.stop();
    }
    DestroySpeechObject() {
        if (this.speechRecognition)
            this.speechRecognition.stop();
    }

}