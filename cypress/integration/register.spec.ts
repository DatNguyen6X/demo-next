describe('Navigation', () => {
    it('should navigate to the about page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        cy.get('input[id="horizontal_login_username"]').type('test@gmail.com');
        cy.get('input[id="horizontal_login_password"]').type('123456');
        cy.get('.ant-btn-default').type('{enter}');

        // Register success
        cy.get('.ant-btn-default').should('have.class', 'register-success');

        // Register failed
        cy.get('.ant-btn-default').should('have.class', 'register-failed');
    })
})