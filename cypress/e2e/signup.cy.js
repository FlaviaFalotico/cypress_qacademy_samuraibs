/// <reference types="cypress" />

import { go, form, submit } from "../support/pages/signup/index";
import { shouldHaveText } from "../support/components/toast";
import { haveText } from "../support/components/alert";

describe("Signup", () => {
  beforeEach(() => {
    go();
  });

  // To use the cy.fixture command you cannot use arrow function at the same time
  before(function () {
    cy.fixture("signup").then(function (signup) {
      this.success = signup.success
      this.email_exist = signup.email_exist
      this.email_inv = signup.email_inv
      this.short_password = signup.short_password
    })
  })

  context("Quando o usuário é novato", function () {
    before(function () {
      cy.task("removeUser", this.success.email).then(function (result) {
        console.log(result);
      });
    });

    it("Deve cadastrar com sucesso", function () {
      form(this.success);
      submit();
      shouldHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("Quando o e-mail já existe", function () {
    before(function () {
      cy.postUser(this.email_exist);
    });

    it("Não deve cadastrar o usuário.", function () {
      form(this.email_exist);
      submit();
      shouldHaveText("Email já cadastrado para outro usuário.");
    });
  });

  context("Quando o e-mail é incorreto", function () {
    it("Deve exibir mesnsagem de alerta", function () {
      form(this.email_inv);
      submit();
      haveText("Informe um email válido");
    });
  });

  context("Quando a senha contem menos de 6 caracteres", function () {
    const passwords = ["x", "xx", "xxx", "xxxx", "xxxxx"];

    passwords.forEach(function (p) {
      it("Não deve cadastrar e deve exibir mesnsagem de alerta", function () {
        this.short_password.password = p;
        form(this.short_password);
        submit();
      });
    });

    afterEach(function () {
      haveText("Pelo menos 6 caracteres");
    });
  });

  context("Quando nenhum dos campos obrigatórios é preenchido", function () {
    const alertMessages = [
      "Nome é obrigatório",
      "E-mail é obrigatório",
      "Senha é obrigatória",
    ];

    beforeEach(function () {
      submit();
    });

    alertMessages.forEach(function (alert) {
      it("Deve exibir " + alert.toLocaleLowerCase(), function () {
        haveText(alert);
      });
    });
  });
});
