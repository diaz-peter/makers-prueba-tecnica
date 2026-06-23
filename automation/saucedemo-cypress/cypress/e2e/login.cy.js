import loginPage from '../pages/LoginPage';

describe('Smoke Test - Login SauceDemo', () => {
  let users;

  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  it('TC01 - Login exitoso con credenciales válidas', () => {
    loginPage.login(users.validUser.username, users.validUser.password);
    loginPage.assertRedirectedToInventory();
  });

  it('TC02 - Login fallido con contraseña incorrecta', () => {
    loginPage.login(
      users.invalidPasswordUser.username,
      users.invalidPasswordUser.password
    );
    loginPage
      .assertErrorMessageContains(users.messages.invalidCredentials)
      .assertUrlIsLoginPage();
  });

  it('TC03 - Validación de campo obligatorio: username vacío', () => {
    loginPage.login('', users.validUser.password);
    loginPage.assertErrorMessageContains(users.messages.missingUsername);
  });

  it('TC04 - Validación de campo obligatorio: password vacío', () => {
    loginPage.login(users.validUser.username, '');
    loginPage.assertErrorMessageContains(users.messages.missingPassword);
  });

  it('TC05 (extra) - Login con usuario bloqueado (locked_out_user)', () => {
    loginPage.login(users.lockedUser.username, users.lockedUser.password);
    loginPage
      .assertErrorMessageContains(users.messages.lockedOut)
      .assertUrlIsLoginPage();
  });
});
