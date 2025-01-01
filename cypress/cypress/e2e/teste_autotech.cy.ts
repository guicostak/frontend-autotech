describe('Página inicial da Autotech', () => {
    it('Deve carregar a página inicial', () => {
      // Visitar a página inicial
      cy.visit('/');
      
      // Verificar se o título está presente
      cy.contains('Autotech');
    });
  });
  