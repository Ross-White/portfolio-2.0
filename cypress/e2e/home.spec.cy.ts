describe('navigation', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })

  it('is able to navigate to all pages', () => {

    cy.visit('/')
    
    cy.contains("About").click()
    cy.url().should("include", "/about")

    cy.contains("CV").click()
    cy.url().should("include", "/cv")

    cy.contains("Home").click()
    cy.contains("Hello")
  })

})