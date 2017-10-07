import { FacebookApiPage } from './app.po';

describe('facebook-api App', () => {
  let page: FacebookApiPage;

  beforeEach(() => {
    page = new FacebookApiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
