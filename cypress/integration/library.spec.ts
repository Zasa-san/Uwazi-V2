describe('Library', () => {
  before(() => {
    cy.request({
      url: '/login?index=&_data=routes/login/index',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      form: true,
      body: { userName: 'admin', password: 'admin', redirectTo: '/library' },
    });
  });

  it('should display entities', () => {
    cy.url().should('eq', 'http://localhost:3001/library');
  });
});
