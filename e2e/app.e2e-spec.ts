import { AiPage } from './app.po';

describe('ai App', () => {
  let page: AiPage;

  beforeEach(() => {
    page = new AiPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
