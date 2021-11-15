describe('Navigation', () => {
    it('should navigate to the about page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000')

        cy.get('input[id="horizontal_login_username"]').type('test@gmail.com');
        cy.get('input[id="horizontal_login_password"]').type('123');
        cy.get('.ant-btn-primary').type('{enter}');

        // Login success
        cy.get('.ant-btn-primary').should('contain', 'Share Video');

        cy.get('.share-video').click()

        cy.url().should('include', '/share')

        // Start share video
        cy.get('#basic_youtubeUrl').type('https://www.youtube.com/watch?v=HmZKgaHa3Fg').type('{enter}');

        // Share success
        cy.get('.ant-alert-message').should('contain', 'Shared success.')

        // Share failed
        cy.get('.ant-alert-message').should('contain', 'Shared failed.')
    })
})