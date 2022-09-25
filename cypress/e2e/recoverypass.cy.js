/// <reference types="cypress" />

import { go, form, submit } from "../support/pages/forgotpass";
import { shouldHaveText } from "../support/components/toast";

describe("Recover Password", function () {
  before(function () {
    cy.fixture("recovery").then(function (recovery) {
      this.data = recovery;
    });
  });

  context("Quando o usuário esquece a senha", function () {
    before(function () {
      cy.postUser(this.data);
    });

    it("deve poder resgatar pelo email", function () {
        go();
        form(this.data.email);
        submit();

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
        shouldHaveText(message);
    });
  });
});
