// cypress/e2e/04-analysis-filters.cy.ts
// Flujo 4 — Análisis de síntomas: filtros, selección de vacunas y diagrama de araña
// Verifica que los filtros de sexo y edad funcionan, que se pueden seleccionar
// vacunas para comparar y que el diagrama de araña (RadarPerfilRiesgo) se renderiza

describe('Flujo 4 — Análisis de síntomas con filtros y diagrama de araña', () => {
  beforeEach(() => {
    cy.loginProgrammatic(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD'),
    )
    cy.visit('/analisis_sintomas')
  })

  it('muestra el título de la sección y la barra de filtros', () => {
    cy.contains('Análisis de Síntomas').should('be.visible')
    cy.contains('Filtros de Análisis').should('be.visible')
  })

  it('aplica el filtro de sexo "Femenino" y actualiza los datos', () => {
    // FilterSelect usa un <select> nativo, por lo que cy.select() funciona directamente
    cy.contains('Cargando vacunas...').should('not.exist')

    cy.get('select').eq(0).select('F')
    cy.get('select').eq(0).should('have.value', 'F')

    // Verifica que no hay error tras aplicar el filtro
    cy.contains('Error cargando análisis.').should('not.exist')
  })

  it('aplica el filtro de grupo de edad "18-29"', () => {
    cy.contains('Cargando vacunas...').should('not.exist')

    cy.get('select').eq(1).select('18-29')
    cy.get('select').eq(1).should('have.value', '18-29')

    cy.contains('Error cargando análisis.').should('not.exist')
  })

  it('combina filtros de sexo y edad correctamente', () => {
    cy.contains('Cargando vacunas...').should('not.exist')

    cy.get('select').eq(0).select('M')
    cy.get('select').eq(1).select('30-49')

    cy.get('select').eq(0).should('have.value', 'M')
    cy.get('select').eq(1).should('have.value', '30-49')

    cy.contains('Error cargando análisis.').should('not.exist')
  })

  it('permite seleccionar vacunas con el selector de checkboxes', () => {
    cy.contains('Cargando vacunas...').should('not.exist')

    // Los botones de vacuna tienen role="checkbox"
    cy.get('[role="checkbox"]', { timeout: 10000 }).should('have.length.greaterThan', 0)

    // Selecciona la primera vacuna disponible
    cy.get('[role="checkbox"]').first().click()
    cy.get('[role="checkbox"]').first().should('have.attr', 'aria-checked', 'true')

    // El contador está dentro de un contenedor con overflow, scrollIntoView lo hace visible
    cy.contains('1/5 seleccionadas').scrollIntoView().should('be.visible')
  })

  it('renderiza el diagrama de araña (RadarPerfilRiesgo) en la página', () => {
    // El scroll real está en el <main> con overflow-y-auto, no en window.
    // cy.scrollTo('bottom') falla sobre window cuando este no es el contenedor scrollable.
    cy.get('main').scrollTo('bottom', { ensureScrollable: false })

    // Verifica que hay al menos un SVG de Recharts (diagrama de araña)
    cy.get('svg.recharts-surface', { timeout: 10000 }).should('exist')
  })
})
