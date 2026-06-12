/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      loginProgrammatic(email: string, password: string): Chainable<void>
    }
  }
}

/**
 * Login programático sin pasar por la UI.
 * Usa cy.session() para cachear el resultado: Firebase solo se llama UNA VEZ
 * por combinación email+password durante toda la ejecución. Los tests siguientes
 * restauran localStorage desde la sesión cacheada sin tocar Firebase.
 */
Cypress.Commands.add('loginProgrammatic', (email: string, password: string) => {
  cy.session([email, password], () => {
    const apiKey = Cypress.env('FIREBASE_API_KEY')
    const apiUrl = Cypress.env('API_URL') || 'http://localhost:8080'

    cy.request({
      method: 'POST',
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      body: { email, password, returnSecureToken: true },
      failOnStatusCode: true,
    }).then(({ body: { idToken } }) => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/auth/login`,
        headers: { Authorization: `Bearer ${idToken}` },
        failOnStatusCode: true,
      }).then(({ body: user }) => {
        // cy.visit() es necesario para poder acceder a window.localStorage
        // desde dentro de cy.session(). El estado de localStorage queda
        // cacheado y se restaura automáticamente en cada test siguiente.
        cy.visit('/', {
          onBeforeLoad(win) {
            win.localStorage.setItem('token', idToken)
            win.localStorage.setItem('user', JSON.stringify(user))
          },
        })
      })
    })
  })
})
