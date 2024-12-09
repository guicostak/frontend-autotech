describe('Login Test for Autotech', () => {
  beforeEach(() => {
    // URL base do ambiente local
    cy.visit('http://localhost:3000/entrar');
  });

  it('should display login form', () => {
    cy.get('form').should('be.visible');
  });

  it('should login with valid credentials', () => {
    cy.get('input[name="email"]').type('ian18nr@gmail.com');
    cy.get('input[name="senha"]').type('123456789');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
  });

  it('should display error message for invalid credentials', () => {
    // Preenchendo o formulário com credenciais inválidas
    cy.get('input[name="email"]').type('usuario@autotech.com');
    cy.get('input[name="senha"]').type('senhaIncorreta');

    // Submetendo o formulário
    cy.get('button[type="submit"]').click();

    // Verifica se o modal de erro aparece
    cy.get('div.flex.flex-col.items-center.justify-center.p-6.bg-white.rounded-lg')
      .should('be.visible')
      .within(() => {
        // Verifica o título e a mensagem do modal
        cy.get('h1').should('contain', 'Erro ao logar!');
        cy.get('p').should('contain', 'Usuário não cadastrado!');
      });
  });

  it('should validate required fields', () => {
    // Clica no botão sem preencher os campos
    cy.get('button[type="submit"]').click();
  
    // Verifica se a mensagem de erro aparece abaixo dos campos
    cy.get('input[name="email"]').then(($el) => {
      const validationMessage = ($el[0] as HTMLInputElement).validationMessage;
      expect(validationMessage).to.exist;
    });
  
    cy.get('input[name="senha"]').then(($el) => {
      const validationMessage = ($el[0] as HTMLInputElement).validationMessage;
      expect(validationMessage).to.exist;
    });
  
    // Ou verifica se aparece alguma mensagem de erro genérica
    cy.contains('Por favor preencha todos os campos').should('be.visible');
  });
});
