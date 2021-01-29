describe('Blog app', function() {
  beforeEach(function() {
    /*
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    */
    cy.visit('http://localhost:3000')
  })

  it('render login form by default', function() {
    cy.contains('login to application')
    //cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })

  describe('when logged in', function() {
    it('user can log in', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('mluukkai logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new blog can be created', function() {
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'cypress',
        url: 'www.baidu.com'
      })
      cy.contains('a blog created by cypress')
      cy.contains('cypress')
    })

    it('user can like the blog', function() {
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'cypress',
        url: 'www.baidu.com'
      })
      cy.contains('a blog created by cypress').parent().find('button').as('theBtn')
      cy.get('@theBtn').then(buttons => {
        cy.wrap(buttons[2]).click({ force: true })
        cy.contains(1)
        cy.wrap(buttons[3]).click({ force: true })//remove created blog
      })
    })

    it('user can delete his blogs but cannot delete others blogs', function() {
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'cypress',
        url: 'www.baidu.com'
      })
      cy.contains('a blog created by cypress').parent().find('button').as('theBtn')
      cy.get('@theBtn').then(buttons => {
        cy.wrap(buttons[3]).click({ force: true })//remove the blog he created
        cy.contains('remove').parent().find('button').then(btns => {
          cy.wrap(btns[2].click({ force: true }))//cannot remove other's blog
          cy.contains('blog \'a blog created by cypress\' by cypress deleted')
          cy.contains('user is not allowed to remove other users blogs')
        })
      })
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it.only('The blogs are in decrescent order regarding the likes', function () {
      cy.contains('peng').contains('view').click()
      cy.contains('xudong').contains('view').click()
      cy.contains('haibi').contains('view').click()
      /*cy.get('#likes').then($firstlike => {
        const firstLike = $firstlike[0].innerText
        console.log(firstLike)
        cy.contains('xudong').get('#likes').should($secondlike => {
          const secondLike = $secondlike[0].innerText
          console.log(secondLike)
        })
      })
      */
      cy.get('.likes').then(likes => {
        const likes0 = Number(likes[0].innerText)
        const likes1 = Number(likes[1].innerText)
        const likes2 = Number(likes[2].innerText)
        console.log(likes0)
        console.log(likes1)
        console.log(likes2)
        expect(likes2).to.be.lessThan(likes1)
        expect(likes1).to.be.lessThan(likes0)
      })
    })
  })
})