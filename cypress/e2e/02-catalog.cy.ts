// cypress/e2e/02-catalog.cy.ts
// Flujo 2 — Catálogo de vacunas: listado, detalle y exportación PDF
// Verifica que la tabla carga, el modal de detalle se abre y el modal PDF funciona

describe('Flujo 2 — Catálogo de vacunas', () => {
  beforeEach(() => {
    cy.loginProgrammatic(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD'),
    )
    cy.visit('/catalog')
  })

  it('muestra el título del catálogo', () => {
    cy.contains('Catálogo de vacunas').should('be.visible')
  })

  it('carga la lista de vacunas en la tabla', () => {
    cy.contains('Cargando vacunas...').should('not.exist')
    cy.get('table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0)
  })

  it('abre el modal de detalle al hacer clic en el ícono de información', () => {
    cy.contains('Cargando vacunas...').should('not.exist')

    // El ícono Info de lucide-react está dentro del primer <td> de cada fila
    cy.get('table tbody tr', { timeout: 10000 })
      .first()
      .find('td:first-child svg')
      .click()

    cy.contains('Cargando información...').should('not.exist')

    // El modal muestra información de la vacuna (nombre, descripción, etc.)
    cy.get('[role="dialog"], .fixed.inset-0').should('be.visible')
  })

  it('el botón PDF abre el modal de configuración de reporte', () => {
    cy.contains('Cargando vacunas...').should('not.exist')

    cy.contains('button', 'PDF').should('not.be.disabled').click()

    cy.contains('Configurar Reporte PDF').should('be.visible')
    cy.contains('Conclusiones de la Dirección').should('be.visible')
  })

  it('permite escribir notas y confirmar la exportación PDF', () => {
    cy.contains('Cargando vacunas...').should('not.exist')

    cy.contains('button', 'PDF').click()
    cy.contains('Configurar Reporte PDF').should('be.visible')

    cy.get('textarea').type('Notas ejecutivas de prueba E2E.')

    // El botón de exportar debe estar habilitado (notas son opcionales, siempre habilitado)
    cy.contains('button', /exportar|generar/i).should('not.be.disabled')
  })
})
