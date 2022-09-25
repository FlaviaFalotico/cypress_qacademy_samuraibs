/// <reference types="cypress" />

import { el } from "./elements";
import toast from "../../components/toast";

class ResetPassPage {
  constructor() {
    this.toast = toast;
  }

  go(token) {
    cy.visit("/reset-password?token=" + token);
  }

  form(newPass, confirmPass) {
    cy.get(el.newPass).clear().type(newPass);
    cy.get(el.confirmPass).clear().type(confirmPass);
  }

  submit() {
    cy.contains(el.btnAltPass, "Alterar senha").click();
  }
}

export default new ResetPassPage();
