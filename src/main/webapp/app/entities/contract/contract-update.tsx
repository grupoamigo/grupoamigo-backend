import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './contract.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContractUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IContractUpdateState {
  isNew: boolean;
  companyId: string;
}

export class ContractUpdate extends React.Component<IContractUpdateProps, IContractUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      companyId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCompanies();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.dateSigned = convertDateTimeToServer(values.dateSigned);

    if (errors.length === 0) {
      const { contractEntity } = this.props;
      const entity = {
        ...contractEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/contract');
  };

  render() {
    const { contractEntity, companies, loading, updating } = this.props;
    const { isNew } = this.state;

    const { signature, signatureContentType, contractFile, contractFileContentType, qrCode, qrCodeContentType } = contractEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoamigoBackendApp.contract.home.createOrEditLabel">
              <Translate contentKey="grupoamigoBackendApp.contract.home.createOrEditLabel">Create or edit a Contract</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : contractEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="contract-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="contract-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="contract-type">
                    <Translate contentKey="grupoamigoBackendApp.contract.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="contract-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && contractEntity.type) || 'PRESTACION_DE_SERVICIO'}
                  >
                    <option value="PRESTACION_DE_SERVICIO">{translate('grupoamigoBackendApp.ContractType.PRESTACION_DE_SERVICIO')}</option>
                    <option value="TERMINOS_Y_CONDICIONES">{translate('grupoamigoBackendApp.ContractType.TERMINOS_Y_CONDICIONES')}</option>
                    <option value="DECISION_INTERNA">{translate('grupoamigoBackendApp.ContractType.DECISION_INTERNA')}</option>
                    <option value="SOLICITUD_DE_SERVICIO">{translate('grupoamigoBackendApp.ContractType.SOLICITUD_DE_SERVICIO')}</option>
                    <option value="SOLICITU_DE_MANIOBRA">{translate('grupoamigoBackendApp.ContractType.SOLICITU_DE_MANIOBRA')}</option>
                    <option value="INSPECCION">{translate('grupoamigoBackendApp.ContractType.INSPECCION')}</option>
                    <option value="EMPLEADO">{translate('grupoamigoBackendApp.ContractType.EMPLEADO')}</option>
                    <option value="CONFIDENCIALIDAD">{translate('grupoamigoBackendApp.ContractType.CONFIDENCIALIDAD')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="contract-title">
                    <Translate contentKey="grupoamigoBackendApp.contract.title">Title</Translate>
                  </Label>
                  <AvField
                    id="contract-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="legalProseLabel" for="contract-legalProse">
                    <Translate contentKey="grupoamigoBackendApp.contract.legalProse">Legal Prose</Translate>
                  </Label>
                  <AvField
                    id="contract-legalProse"
                    type="text"
                    name="legalProse"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="signatureLabel" for="signature">
                      <Translate contentKey="grupoamigoBackendApp.contract.signature">Signature</Translate>
                    </Label>
                    <br />
                    {signature ? (
                      <div>
                        <a onClick={openFile(signatureContentType, signature)}>
                          <img src={`data:${signatureContentType};base64,${signature}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {signatureContentType}, {byteSize(signature)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('signature')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_signature" type="file" onChange={this.onBlobChange(true, 'signature')} accept="image/*" />
                    <AvInput type="hidden" name="signature" value={signature} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="contractFileLabel" for="contractFile">
                      <Translate contentKey="grupoamigoBackendApp.contract.contractFile">Contract File</Translate>
                    </Label>
                    <br />
                    {contractFile ? (
                      <div>
                        <a onClick={openFile(contractFileContentType, contractFile)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {contractFileContentType}, {byteSize(contractFile)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('contractFile')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_contractFile" type="file" onChange={this.onBlobChange(false, 'contractFile')} />
                    <AvInput type="hidden" name="contractFile" value={contractFile} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="qrCodeLabel" for="qrCode">
                      <Translate contentKey="grupoamigoBackendApp.contract.qrCode">Qr Code</Translate>
                    </Label>
                    <br />
                    {qrCode ? (
                      <div>
                        <a onClick={openFile(qrCodeContentType, qrCode)}>
                          <img src={`data:${qrCodeContentType};base64,${qrCode}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {qrCodeContentType}, {byteSize(qrCode)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('qrCode')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_qrCode" type="file" onChange={this.onBlobChange(true, 'qrCode')} accept="image/*" />
                    <AvInput type="hidden" name="qrCode" value={qrCode} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="digitalFingerprintLabel" for="contract-digitalFingerprint">
                    <Translate contentKey="grupoamigoBackendApp.contract.digitalFingerprint">Digital Fingerprint</Translate>
                  </Label>
                  <AvField id="contract-digitalFingerprint" type="text" name="digitalFingerprint" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateSignedLabel" for="contract-dateSigned">
                    <Translate contentKey="grupoamigoBackendApp.contract.dateSigned">Date Signed</Translate>
                  </Label>
                  <AvInput
                    id="contract-dateSigned"
                    type="datetime-local"
                    className="form-control"
                    name="dateSigned"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.contractEntity.dateSigned)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="expirationDateLabel" for="contract-expirationDate">
                    <Translate contentKey="grupoamigoBackendApp.contract.expirationDate">Expiration Date</Translate>
                  </Label>
                  <AvField id="contract-expirationDate" type="date" className="form-control" name="expirationDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="contract-status">
                    <Translate contentKey="grupoamigoBackendApp.contract.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="contract-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && contractEntity.status) || 'EMITIDO'}
                  >
                    <option value="EMITIDO">{translate('grupoamigoBackendApp.ContractStatusType.EMITIDO')}</option>
                    <option value="FIRMADO">{translate('grupoamigoBackendApp.ContractStatusType.FIRMADO')}</option>
                    <option value="ACTIVO">{translate('grupoamigoBackendApp.ContractStatusType.ACTIVO')}</option>
                    <option value="CANCELADO">{translate('grupoamigoBackendApp.ContractStatusType.CANCELADO')}</option>
                    <option value="PAUSADO">{translate('grupoamigoBackendApp.ContractStatusType.PAUSADO')}</option>
                    <option value="TERMINADO">{translate('grupoamigoBackendApp.ContractStatusType.TERMINADO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="contract-company">
                    <Translate contentKey="grupoamigoBackendApp.contract.company">Company</Translate>
                  </Label>
                  <AvInput id="contract-company" type="select" className="form-control" name="company.id">
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.legalName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/contract" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  companies: storeState.company.entities,
  contractEntity: storeState.contract.entity,
  loading: storeState.contract.loading,
  updating: storeState.contract.updating,
  updateSuccess: storeState.contract.updateSuccess
});

const mapDispatchToProps = {
  getCompanies,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractUpdate);
