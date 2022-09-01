/// <reference types="cypress" />

import { go, form, submit, alertHaveText} from "../support/pages/login";
import dashPage from "../support/pages/dashboard";
import { shouldHaveText } from "../support/components/toast";

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

  context("Quando o usuário possui uma senha está incorreta", () => {
    const user = {
      nome: "Celso Kamura",
      email: "kamura@samuraibs.com",
      password: "abc123",
      is_provider: true,
    };

    before( () => {
      cy.postUser(user).then(() => {
        user.password = "abc123";
      });
    });

    it("Deve notificar erro de credenciais", () => {
      go();
      form(user);
      submit();

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";
      shouldHaveText(message);
    });
  });

  context("Quando o formato do email é inválido", () => {
    const emails = [
      " ",
      "papito.com.br",
      "@",
      "gmail.com.br",
      "papito@",
      "123",
      "2337.com",
      "!@#$%",
      "xpto123",
    ];

    before( () => {
      go();
    })

    emails.forEach((email) => {
      it("Não deve logar com o email: " + email, () => {
        const user = { email: email, password: "pwd123" };

        form(user);
        submit();
        alertHaveText("Informe um email válido");
      });
    });
  });
});
