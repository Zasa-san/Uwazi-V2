describe('Login Test', () => {
  it('should login', () => {
    cy.visit('/login');
    cy.get('#userName').type('admin');
    cy.get('#password').type('admin');
    cy.get('.space-y-6 > .px-4').click();
    cy.url().should('eq', 'http://localhost:3001/library');
    cy.getCookie('connect.sid').should('exist');
  });
});
