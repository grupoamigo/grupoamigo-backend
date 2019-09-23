import { element, by, ElementFinder } from 'protractor';

export default class ClientUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoamigoBackendApp.client.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  uniqueIdInput: ElementFinder = element(by.css('input#client-uniqueId'));
  memberSinceInput: ElementFinder = element(by.css('input#client-memberSince'));
  statusSelect: ElementFinder = element(by.css('select#client-status'));
  internalNotesInput: ElementFinder = element(by.css('input#client-internalNotes'));
  suppliersSelect: ElementFinder = element(by.css('select#client-suppliers'));
  clientsSelect: ElementFinder = element(by.css('select#client-clients'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUniqueIdInput(uniqueId) {
    await this.uniqueIdInput.sendKeys(uniqueId);
  }

  async getUniqueIdInput() {
    return this.uniqueIdInput.getAttribute('value');
  }

  async setMemberSinceInput(memberSince) {
    await this.memberSinceInput.sendKeys(memberSince);
  }

  async getMemberSinceInput() {
    return this.memberSinceInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setInternalNotesInput(internalNotes) {
    await this.internalNotesInput.sendKeys(internalNotes);
  }

  async getInternalNotesInput() {
    return this.internalNotesInput.getAttribute('value');
  }

  async suppliersSelectLastOption() {
    await this.suppliersSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async suppliersSelectOption(option) {
    await this.suppliersSelect.sendKeys(option);
  }

  getSuppliersSelect() {
    return this.suppliersSelect;
  }

  async getSuppliersSelectedOption() {
    return this.suppliersSelect.element(by.css('option:checked')).getText();
  }

  async clientsSelectLastOption() {
    await this.clientsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clientsSelectOption(option) {
    await this.clientsSelect.sendKeys(option);
  }

  getClientsSelect() {
    return this.clientsSelect;
  }

  async getClientsSelectedOption() {
    return this.clientsSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
