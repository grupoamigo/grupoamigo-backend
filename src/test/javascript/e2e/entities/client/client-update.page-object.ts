import { element, by, ElementFinder } from 'protractor';

export default class ClientUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoamigoBackendApp.client.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  uniqueIdInput: ElementFinder = element(by.css('input#client-uniqueId'));
  memberSinceInput: ElementFinder = element(by.css('input#client-memberSince'));
  statusSelect: ElementFinder = element(by.css('select#client-status'));
  internalNotesInput: ElementFinder = element(by.css('input#client-internalNotes'));

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
