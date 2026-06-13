// cypress/e2e/01-dashboard.cy.ts
// Flujo 1 — Dashboard ejecutivo
// Verifica que el dashboard carga KPIs, gráficas y el modal de comparación

describe('Flujo 1 — Dashboard ejecutivo', () => {
  beforeEach(() => {
    cy.loginProgrammatic(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD'),
    )
    cy.visit('/dashboard')
  })

  it('muestra el título y descripción del dashboard', () => {
    cy.contains('Dashboard Ejecutivo').should('be.visible')
    cy.contains('Resumen general de vacunas y eventos adversos').should('be.visible')
  })

  it('carga y muestra los 4 KPIs con valores distintos de "-"', () => {
    // Espera a que desaparezca el estado de carga
    cy.contains('Cargando KPIs...').should('not.exist')

    cy.get('[data-testid="kpi-value"]', { timeout: 10000 })
      .should('have.length', 4)
      .each(($kpi) => {
        cy.wrap($kpi).invoke('text').should('not.eq', '-')
      })
  })

  it('renderiza las cuatro secciones de gráficas', () => {
    // El <main> tiene overflow-y-auto, por lo que los títulos fuera del viewport
    // están recortados. scrollIntoView() los desplaza antes de verificar visibilidad.
    cy.contains('Frecuencia de Sintomas Adversos').scrollIntoView().should('be.visible')
    cy.contains('Seguridad por Vacuna').scrollIntoView().should('be.visible')
    cy.contains('Costos por Vacuna').scrollIntoView().should('be.visible')
    cy.contains('Distribución de Severidad').scrollIntoView().should('be.visible')
  })

  it('el botón "Comparar Vacunas" abre el modal de comparación', () => {
    cy.contains('button', 'Comparar Vacunas').click()

    cy.contains('Comparación de Vacunas').should('be.visible')
    cy.contains('Primera vacuna a comparar').should('be.visible')
    cy.contains('Segunda vacuna a comparar').should('be.visible')
    cy.contains('button', 'Crear Comparación').should('be.disabled')
  })
})
