import { BookoforbsPage } from './app.po';

describe('bookoforbs App', () => {
  let page: BookoforbsPage;

  beforeEach(() => {
    page = new BookoforbsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
