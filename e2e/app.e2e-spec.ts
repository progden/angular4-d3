import { NgD3Page } from './app.po';

describe('ng-d3 App', () => {
  let page: NgD3Page;

  beforeEach(() => {
    page = new NgD3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
