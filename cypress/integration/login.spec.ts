describe('Navigation', () => {
    it('should navigate to the about page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        cy.get('input[id="horizontal_login_username"]').type('test@gmail.com');
        cy.get('input[id="horizontal_login_password"]').type('123');
        cy.get('.ant-btn-primary').type('{enter}');

        // Login success
        cy.get('.ant-btn-primary').should('contain', 'Share Video');

        // Login failed
        cy.get('.ant-btn-primary').should('have.class', 'login-failed');
    })
})