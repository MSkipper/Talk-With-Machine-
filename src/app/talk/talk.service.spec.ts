import { TestBed, inject } from '@angular/core/testing';

import { TalkService } from './talk.service';

describe('TalkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TalkService]
    });
  });

  it('should be created', inject([TalkService], (service: TalkService) => {
    expect(service).toBeTruthy();
  }));
});
