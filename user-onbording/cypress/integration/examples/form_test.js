describe('forms app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    const nameInput = () => cy.get('input[name="name"]')
    const submitBtn = () => cy.get('button[class="submit-form"]')

    it('is cypress working', () => {
        expect(1+2).to.equal(3);
    });

    it('text input tests', () => {
    // Get the Name input and type a name in it.
    nameInput().should('have.value', '').type('Austin');
    // Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
    nameInput().should('have.value', 'Austin');
    // Get the Email input and type an email address in it
    cy.get('input[name="email"]').should('have.value', '').type('abcarman12@gmail.com');
    // Get the password input and type a password in it
    cy.get('input[name="password"]').should('have.value', '').type('password');
    })

    it('checkbox tests', () => {
        // Set up a test that will check to see if a user can check the terms of service box
        cy.get('input[name="terms"]').check()
        cy.get('input[name="terms"]').uncheck()
        cy.get('input[name="terms"]').should('not.be.checked')
        cy.get('input[name="terms"]').click()
        cy.get('input[name="terms"]').should('be.checked')
    })

    it('submit button tests', () => {
        // Check to see if a user can submit the form data
        // Check for form validation if an input is left empty
        submitBtn().should('be.disabled');
        nameInput().should('have.value', '').type('Austin');
        submitBtn().should('be.disabled');
        cy.get('input[name="email"]').should('have.value', '').type('abcarman12@gmail.com');
        submitBtn().should('be.disabled');
        cy.get('input[name="password"]').should('have.value', '').type('password');
        submitBtn().should('be.disabled');
        cy.get('input[name="confirmPassword"]').type('password');
        submitBtn().should('be.disabled');
        cy.get('input[name="terms"]').check()
        submitBtn().should('be.enabled');
        submitBtn().click();
        nameInput().should('have.value', '');
        cy.get('input[name="email"]').should('have.value', '');
        cy.get('input[name="password"]').should('have.value', '')
        cy.get('input[name="confirmPassword"]').should('have.value', '');
        cy.get('input[name="terms"]').should('not.be.checked');
        submitBtn().should('be.disabled');

    });
});

