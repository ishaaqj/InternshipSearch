import { InternshipSearchPage } from './app.po';

describe('internshpSearch App', () => {
  let page: InternshipSearchPage;

  beforeEach(() => {
    page = new InternshipSearchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
