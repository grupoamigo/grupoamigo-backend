import { element, by, ElementFinder } from 'protractor';

export default class TransportUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoamigoBackendApp.transport.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  plateIdInput: ElementFinder = element(by.css('input#transport-plateId'));
  typeSelect: ElementFinder = element(by.css('select#transport-type'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPlateIdInput(plateId) {
    await this.plateIdInput.sendKeys(plateId);
  }

  async getPlateIdInput() {
    return this.plateIdInput.getAttribute('value');
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
