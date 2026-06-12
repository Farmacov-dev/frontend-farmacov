// cypress/e2e/03-comparison.cy.ts
// Flujo 3 — Comparación de dos vacunas
// Verifica la selección de vacunas en el modal, la navegación a la página
// de comparación y que la tabla comparativa carga correctamente

describe('Flujo 3 — Comparación entre dos vacunas', () => {
  beforeEach(() => {
    cy.loginProgrammatic(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD'),
    )
    cy.visit('/dashboard')
  })

  it('el botón "Crear Comparación" permanece deshabilitado sin seleccionar vacunas', () => {
    cy.contains('button', 'Comparar Vacunas').click()
    cy.contains('button', 'Crear Comparación').should('be.disabled')
  })

  it('permite seleccionar la primera vacuna en el modal', () => {
    cy.contains('button', 'Comparar Vacunas').click()

    // SelectDropdown es un div custom. Su <ul> de opciones vive dentro del mismo
    // div.relative que el trigger. Acotamos con .closest('.relative') para no
    // confundir con los <li> de leyendas de Recharts que existen en el fondo.
    cy.contains('Primera vacuna a comparar')
      .closest('.relative')
      .as('dropdownA')

    cy.get('@dropdownA').click()
    cy.get('@dropdownA').find('ul li', { timeout: 5000 }).first().click()

    // El placeholder ya no debe existir — hay una vacuna seleccionada
    cy.contains('Primera vacuna a comparar').should('not.exist')
  })

  it('navega a la página de comparación con datos al seleccionar dos vacunas', () => {
    cy.contains('button', 'Comparar Vacunas').click()

    // Alias para cada dropdown para evitar seleccionar <li> de Recharts
    cy.contains('Primera vacuna a comparar').closest('.relative').as('dropdownA')
    cy.contains('Segunda vacuna a comparar').closest('.relative').as('dropdownB')

    // Selecciona la primera vacuna y guarda su nombre
    cy.get('@dropdownA').click()
    cy.get('@dropdownA').find('ul li', { timeout: 5000 }).first().then(($li) => {
      const nombreA = $li.text().trim()
      cy.wrap($li).click()

      // Selecciona la segunda vacuna
      cy.get('@dropdownB').click()
      cy.get('@dropdownB').find('ul li', { timeout: 5000 }).first().click()

      // El botón de comparar se habilita
      cy.contains('button', 'Crear Comparación').should('not.be.disabled').click()

      // La URL debe cambiar a /comparacion con los query params
      cy.url().should('include', '/comparacion').and('include', 'a=').and('include', 'b=')

      // Espera a que cargue la tabla comparativa
      cy.contains('Cargando comparación...').should('not.exist')
      cy.contains('Error al cargar').should('not.exist')

      // El header de comparación muestra el nombre de la primera vacuna
      cy.contains(nombreA).should('be.visible')
    })
  })

  it('el botón "Volver" en la página de comparación regresa al dashboard', () => {
    // Navegamos directo con parámetros válidos conocidos (ids 1 y 2)
    cy.visit('/comparacion?a=1&b=2&nombreA=VacunaA&nombreB=VacunaB')

    cy.contains('Cargando comparación...').should('not.exist')

    cy.contains('button', 'Volver').click()
    cy.url().should('include', '/dashboard')
  })
})
