/**
 * LoginPage - encapsula los selectores y acciones de la pantalla de login.
 * Los tests no deben conocer selectores ni estructura del DOM: solo llaman
 * a estos métodos.
 */
class LoginPage {
  // ----- Selectores (privados a la clase) -----
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    errorButton: () => cy.get('.error-button'),
  };

  // ----- Navegación -----
  visit() {
    cy.visit('/');
    return this;
  }

  // ----- Acciones atómicas -----
  typeUsername(username) {
    if (username) {
      this.elements.usernameInput().type(username);
    }
    return this;
  }

  typePassword(password) {
    if (password) {
      this.elements.passwordInput().type(password);
    }
    return this;
  }

  submit() {
    this.elements.loginButton().click();
    return this;
  }

  // ----- Acción compuesta (la que usarán la mayoría de los tests) -----
  login(username, password) {
    this.visit();
    this.typeUsername(username);
    this.typePassword(password);
    this.submit();
    return this;
  }

  // ----- Aserciones reutilizables -----
  assertErrorMessageContains(text) {
    this.elements.errorMessage().should('be.visible').and('contain.text', text);
    return this;
  }

  assertUrlIsLoginPage() {
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    return this;
  }

  assertRedirectedToInventory() {
    cy.url().should('include', '/inventory.html');
    return this;
  }
}

export default new LoginPage();
