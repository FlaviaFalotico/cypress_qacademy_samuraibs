/// <reference types="cypress" />

import { el } from "./elements";

class LoginPage {
  go() {
    cy.visit("/");
  }

  form(user) {
    cy.get(el.email).clear().type(user.email);
    cy.get(el.password).clear().type(user.password);
  }

  submit() {
    cy.contains(el.signInButton).click();
  }
}

export default new LoginPage();
