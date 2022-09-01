/// <reference types="cypress" />

import { go, form, submit } from "../support/pages/login";
import dashPage from "../support/pages/dashboard";

describe("Login", () => {
  context("Quando o usuário possui uma conta cadastrada e ativa", () => {
    const user = {
      name: "Robson Jassa",
      email: "jassa@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };

    before(() => {
      cy.postUser(user);
    });

    it("Deve logar com sucesso", () => {
      go();
      form(user);
      submit();
      dashPage.header.userLoggedIn(user.name);
    });
  });
});
