import { element, by, ElementFinder } from 'protractor';

export default class LoadUpdatePage {
  pageTitle: ElementFinder = element(by.id('grupoamigoBackendApp.load.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeSelect: ElementFinder = element(by.css('select#load-type'));
  uniqueIdInput: ElementFinder = element(by.css('input#load-uniqueId'));
  descriptionInput: ElementFinder = element(by.css('input#load-description'));
  statusSelect: ElementFinder = element(by.css('select#load-status'));
  warehouseSelect: ElementFinder = element(by.css('select#load-warehouse'));
  driversSelect: ElementFinder = element(by.css('select#load-drivers'));
  warehousesSelect: ElementFinder = element(by.css('select#load-warehouses'));

  getPageTitle() {
    return this.pageTitle;
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
  async setUniqueIdInput(uniqueId) {
    await this.uniqueIdInput.sendKeys(uniqueId);
  }

  async getUniqueIdInput() {
    return this.uniqueIdInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
  async warehouseSelectLastOption() {
    await this.warehouseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async warehouseSelectOption(option) {
    await this.warehouseSelect.sendKeys(option);
  }

  getWarehouseSelect() {
    return this.warehouseSelect;
  }

  async getWarehouseSelectedOption() {
    return this.warehouseSelect.element(by.css('option:checked')).getText();
  }

  async driversSelectLastOption() {
    await this.driversSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async driversSelectOption(option) {
    await this.driversSelect.sendKeys(option);
  }

  getDriversSelect() {
    return this.driversSelect;
  }

  async getDriversSelectedOption() {
    return this.driversSelect.element(by.css('option:checked')).getText();
  }

  async warehousesSelectLastOption() {
    await this.warehousesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async warehousesSelectOption(option) {
    await this.warehousesSelect.sendKeys(option);
  }

  getWarehousesSelect() {
    return this.warehousesSelect;
  }

  async getWarehousesSelectedOption() {
    return this.warehousesSelect.element(by.css('option:checked')).getText();
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
