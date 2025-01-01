describe('Teste de Compra - Autotech', () => {
  it('Deve acessar o site, fazer login, buscar um motor, visualizar e finalizar a compra', () => {
    // Acessar a página de login
    // Acessar a página de login
    cy.visit('http://localhost:3000/entrar');
    cy.get('input[name="email"]').type('ian18nr@gmail.com'); // Credenciais válidas
    cy.get('input[name="senha"]').type('123456789'); // Senha válida
    cy.get('button[type="submit"]').click();


    // Preencher as credenciais de login
    cy.get('input[name="email"]').type('ian18nr@gmail.com'); // Substitua pelo e-mail válido
    cy.get('input[name="senha"]').type('123456789'); // Substitua pela senha válida
    cy.get('button').contains('Entrar').click();

    // Verificar se o login foi bem-sucedido
    cy.url().should('not.include', '/entrar');

    // Buscar por "motor" na barra de pesquisa
    cy.get('input[placeholder="Digite o valor para pesquisa"]').type('motor{enter}');

    // Clicar no primeiro anúncio da lista de resultados
    cy.get('a[href^="/anuncio/"]').first().click();

    // Confirmar que estamos na página do anúncio
    cy.url().should('include', '/anuncio/');

    // Clicar no botão "Comprar"
    cy.get('button').contains('Comprar').click();

    // Verificar se o carrinho foi aberto
    cy.url().should('include', '/carrinho');

    // Clicar no botão "Comprar Agora" no carrinho
    cy.get('button').contains('Comprar Agora').click();

    // Verificar se a compra foi finalizada (pode depender da próxima página ou modal)
    cy.url().should('include', '/confirmacao'); // Ajuste a URL para o fluxo de finalização real
  });
});
