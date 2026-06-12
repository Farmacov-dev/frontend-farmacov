// cypress/e2e/05-users-crud.cy.ts
// Flujo 5 — Gestión de usuarios (requiere usuario administrador)
// Verifica listado, búsqueda, edición y eliminación de usuarios existentes

describe('Flujo 5 — Gestión de usuarios (admin)', () => {
  beforeEach(() => {
    cy.loginProgrammatic(
      Cypress.env('TEST_ADMIN_EMAIL'),
      Cypress.env('TEST_ADMIN_PASSWORD'),
    )
    cy.visit('/usuarios')
  })

  it('muestra el título y la lista de usuarios existentes', () => {
    cy.contains('Gestión de Usuarios').should('be.visible')
    cy.get('[data-testid="usuarios-cargando"]', { timeout: 10000 }).should('not.exist')
    cy.get('[data-testid="usuario-fila"]').should('have.length.greaterThan', 0)
  })

  it('filtra usuarios por nombre mediante el buscador', () => {
    cy.get('[data-testid="usuarios-cargando"]', { timeout: 10000 }).should('not.exist')
    cy.get('[data-testid="usuario-fila"]', { timeout: 10000 }).should('have.length.greaterThan', 0)

    // Toma el primer nombre de la tabla para usarlo como término de búsqueda dinámico
    cy.get('[data-testid="usuario-nombre"]').first().invoke('text').then((nombreCompleto) => {
      const termino = nombreCompleto.trim().split(' ')[0].toLowerCase()

      cy.get('input').first().type(termino)

      cy.get('[data-testid="usuario-fila"]').should('have.length.greaterThan', 0)

      cy.get('input').first().clear()
    })
  })

  it('abre el modal de edición del primer usuario y guarda cambios', () => {
    cy.get('[data-testid="usuarios-cargando"]', { timeout: 10000 }).should('not.exist')
    cy.get('[data-testid="usuario-fila"]', { timeout: 10000 }).should('have.length.greaterThan', 0)

    cy.get('[data-testid="usuario-fila"]').first().contains('button', 'Editar').click()

    cy.contains('h2', 'Editar Usuario').should('be.visible')

    // Cambia el departamento y guarda
    cy.contains('label', 'Departamento').parent().find('input').clear().type('QA Automatizado')

    cy.contains('button', 'Guardar Cambios').click()

    // El modal cierra correctamente
    cy.contains('h2', 'Editar Usuario').should('not.exist')
  })

  it('abre el modal de confirmación al intentar eliminar un usuario y puede cancelar', () => {
    cy.get('[data-testid="usuarios-cargando"]', { timeout: 10000 }).should('not.exist')
    cy.get('[data-testid="usuario-fila"]', { timeout: 10000 }).should('have.length.greaterThan', 0)

    cy.get('[data-testid="usuario-fila"]').first().contains('button', 'Eliminar').click()

    // Verifica que aparece el modal de confirmación
    cy.contains('¿Estás seguro').should('be.visible')
    cy.contains('button', 'Sí, eliminar').should('be.visible')

    // Cancela para no modificar datos reales
    cy.contains('button', 'Cancelar').click()

    cy.contains('¿Estás seguro').should('not.exist')
  })
})
