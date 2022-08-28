/// <reference types="cypress" />

import { go, form, submit, alertHaveText } from "../support/pages/signup/index";
import { shouldHeveText } from "../support/components/toast/index";

describe("Signup", () => {
  beforeEach(() => {
    go();
  });

  context("Quando o usuário é novato", () => {
    const user = {
      name: "Homer Simpson",
      email: "homSim@gmail.com",
      password: "homSim123",
    };

    before(() => {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });
    });

    it("Deve cadastrar com sucesso", () => {
      form(user);
      submit();
      shouldHeveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("Quando o e-mail já existe", () => {
    const user = {
      name: "Marge Simpson",
      email: "marSim@gmail.com",
      password: "marSim123",
      is_provider: true,
    };

    before(() => {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });

      cy.request("POST", "http://localhost:3333/users", user).then(function (
        response
      ) {
        expect(response.status).to.eq(200);
      });
    });

    it("Não deve cadastrar o usuário.", () => {
      form(user);
      submit();
      shouldHeveText("Email já cadastrado para outro usuário.");
    });
  });

  context("Quando o e-mail é incorreto", () => {
    const user = {
      name: "Lisa Simpson",
      email: "lisSim.gmail.com",
      password: "lisSim123",
      is_provider: true,
    };

    it("Deve exibir mesnsagem de alerta", () => {
      form(user);
      submit();
      alertHaveText("Informe um email válido");
    });
  });

  context("Quando a senha contem menos de 6 caracteres", () => {
    const passwords = ["x", "xx", "xxx", "xxxx", "xxxxx"];

    passwords.forEach((p) => {
      it("Não deve cadastrar e deve exibir mesnsagem de alerta", () => {
        const user = {
          name: "Barth Simpson",
          email: "barSim.gmail.com",
          password: p,
        };

        form(user);
        submit();
      });
    });

    afterEach(() => {
      alertHaveText("Pelo menos 6 caracteres");
    });
  });

  context.only("Quando nenhum dos campos obrigatórios é preenchido", () => {
    const alertMessages = [
      "Nome é obrigatório",
      "E-mail é obrigatório",
      "Senha é obrigatória",
    ];

    beforeEach( function() {
      submit();
    });

    alertMessages.forEach((alert) => {
      it("Deve exibir " + alert.toLocaleLowerCase(), () => {
        alertHaveText(alert);
      });
    });
  });
});
