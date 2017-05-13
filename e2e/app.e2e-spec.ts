import { MachineTalkerPage } from './app.po';

describe('machine-talker App', () => {
  let page: MachineTalkerPage;

  beforeEach(() => {
    page = new MachineTalkerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
