describe('Teste de criação de anúncio - Autotech', () => {
  it('Deve preencher e enviar o formulário de anúncio', () => {
    // Acessar a página de login
    cy.visit('http://localhost:3000/entrar');
    cy.get('input[name="email"]').type('ian18nr@gmail.com'); // Credenciais válidas
    cy.get('input[name="senha"]').type('123456789'); // Senha válida
    cy.get('button[type="submit"]').click();

    // Verificar redirecionamento após login
    cy.url().should('include', '/');

    // Navegar para a página de criação de anúncio
    cy.get('button').contains('Anuncie grátis').click();

    // Aguardar o formulário de anúncio estar visível
    cy.get('form').should('be.visible');

    // Preencher o título do produto
    cy.get('input[name="titulo"]').type('Motor BMW 320i');

    // Preencher o modelo do produto
    cy.get('input[name="modelo"]').type('320i');

    // Preencher a descrição do produto
    cy.get('textarea[placeholder="Descrição do Produto"]').type(
      'Motor em ótimo estado, com baixa quilometragem.'
    );

    // Selecionar a marca no dropdown
    cy.contains('label', 'Marca')
      .parent()
      .find('[class$="-control"]')
      .click();
    cy.get('[class$="-menu"]').contains('BMW').click();

    // Selecionar a categoria no dropdown
    cy.contains('label', 'Categoria')
      .parent()
      .find('[class$="-control"]')
      .click();
    cy.get('[class$="-menu"]').contains('Motor').click();

    // Preencher o preço
    cy.get('input[name="preco"]').type('15000');

    // Preencher o ano de fabricação
    cy.get('input[name="ano_fabricacao"]').type('2015');

    // Alternar o switch de "Produto único"
    cy.get('.w-10.h-6.rounded-full').click();

    // Fazer upload de imagem
    cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/img.jpg', { force: true });

    // Submeter o formulário
    cy.get('button').contains('Adicionar Anúncio').click();

  });
});
