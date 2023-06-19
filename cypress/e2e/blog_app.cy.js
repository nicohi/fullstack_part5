const rootUser = {
  name: 'Root Root',
  username: 'root',
  password: '1234'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, rootUser)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.visit('')
    cy.contains('log in to application')
  })

  describe('Login', function() {
    beforeEach(function() {
      //cy.login({ username: rootUser.username, password: rootUser.password })
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type(rootUser.username)
      cy.get('#password').type(rootUser.password)
      cy.get('#login-button').click()
      cy.contains('Root Root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(rootUser.username)
      cy.get('#password').type('WRONG-password')
      cy.get('#login-button').click()
      cy.contains('log in to application')
      cy.get('.message').should('contain', 'wrong username or password')
      cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

})
