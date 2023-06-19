const rootUser = {
  name: 'Root Root',
  username: 'root',
  password: '1234'
}

const otherUser = {
  name: 'Other User',
  username: 'other',
  password: '1234'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, rootUser)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, otherUser)
    cy.visit('')
  })
  it('Login form is shown', function() {
    cy.visit('')
    cy.contains('log in to application')
  })

  describe('Login', function() {
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: rootUser.username, password: rootUser.password })
    })
    it('A blog can be created', function() {
      cy.contains('create new').click()
      cy.get('#blog-title').type('Cypress Blog')
      cy.get('#blog-author').type('Cypress')
      cy.get('#blog-url').type('Cypress.com')
      cy.contains('save').click()

      cy.get('.blogDiv').contains('Cypress Blog')
      cy.get('.message').should('contain', 'added')
      cy.get('.message').should('have.css', 'color', 'rgb(0, 128, 0)')
    })
    it('A blog can be liked', function() {
      const blog =  { title: 'Likable Blog', author: 'Cypress', url: 'www.com', likes: 10 }
      cy.createBlog(blog)
      cy.contains('view').click()
      cy.contains('like').click()

      cy.get('.message').should('contain', 'updated')
      cy.get('.message').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('likes').should('contain', blog.likes + 1)
    })
    it('A blog can be deleted by creator', function() {
      const blog =  { title: 'Deletable Blog', author: 'Cypress', url: 'www.com', likes: 10 }
      cy.createBlog(blog)
      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('.message').should('contain', 'deleted')
      cy.get('.message').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('html').should('not.contain', blog.url)
    })
    it('Delete button is only visible for blog creator', function() {
      const blog =  { title: 'Deletable Blog', author: 'Cypress', url: 'www.com', likes: 10 }
      cy.createBlog(blog)
      cy.contains('view').click()
      cy.contains('remove')
      cy.login({ username: otherUser.username, password: otherUser.password })
      cy.contains('view').click()
      cy.contains('remove').should('not.be.visible')
    })
  })

})
