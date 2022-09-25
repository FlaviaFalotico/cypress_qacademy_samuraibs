/// <reference types="cypress" />

import { go, form, submit } from "../support/pages/forgotpass";
import { shouldHaveText } from "../support/components/toast";
import rpPage from "../support/pages/resetPass";

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

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada, but the text was Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
        shouldHaveText(message);
    });
  });

  context("Qnado o usuário solicita o resggate", function () {
    
    before(function () {
      cy.postUser(this.data);
      cy.recoveryPassword(this.data.email);
    });

    it("deve poder cadastradar uma nova senha", function () {
      const token = Cypress.env('recoveryToken');      
      rpPage.go(token);
      rpPage.form('abc123', 'abc123');
      rpPage.submit();

      const message = 'Agora você jápode logar com a sua nova senha secreta.'
      rpPage.toast.shouldHaveText(message);
    })
  })
});