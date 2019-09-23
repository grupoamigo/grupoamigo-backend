import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClientUpdateState {
  isNew: boolean;
  suppliersId: string;
  clientsId: string;
}

export class ClientUpdate extends React.Component<IClientUpdateProps, IClientUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      suppliersId: '0',
      clientsId: '0',
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

  saveEntity = (event, errors, values) => {
    values.memberSince = convertDateTimeToServer(values.memberSince);

    if (errors.length === 0) {
      const { clientEntity } = this.props;
      const entity = {
        ...clientEntity,
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
    this.props.history.push('/entity/client');
  };

  render() {
    const { clientEntity, companies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoamigoBackendApp.client.home.createOrEditLabel">
              <Translate contentKey="grupoamigoBackendApp.client.home.createOrEditLabel">Create or edit a Client</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : clientEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="client-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="client-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="uniqueIdLabel" for="client-uniqueId">
                    <Translate contentKey="grupoamigoBackendApp.client.uniqueId">Unique Id</Translate>
                  </Label>
                  <AvField id="client-uniqueId" type="text" name="uniqueId" />
                </AvGroup>
                <AvGroup>
                  <Label id="memberSinceLabel" for="client-memberSince">
                    <Translate contentKey="grupoamigoBackendApp.client.memberSince">Member Since</Translate>
                  </Label>
                  <AvInput
                    id="client-memberSince"
                    type="datetime-local"
                    className="form-control"
                    name="memberSince"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.clientEntity.memberSince)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="client-status">
                    <Translate contentKey="grupoamigoBackendApp.client.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="client-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && clientEntity.status) || 'ACTIVO'}
                  >
                    <option value="ACTIVO">{translate('grupoamigoBackendApp.ClientStatusType.ACTIVO')}</option>
                    <option value="SOLICITUD">{translate('grupoamigoBackendApp.ClientStatusType.SOLICITUD')}</option>
                    <option value="APROBADO">{translate('grupoamigoBackendApp.ClientStatusType.APROBADO')}</option>
                    <option value="VERIFICADO">{translate('grupoamigoBackendApp.ClientStatusType.VERIFICADO')}</option>
                    <option value="DECLINADO">{translate('grupoamigoBackendApp.ClientStatusType.DECLINADO')}</option>
                    <option value="CANCELADO">{translate('grupoamigoBackendApp.ClientStatusType.CANCELADO')}</option>
                    <option value="PAUSADO">{translate('grupoamigoBackendApp.ClientStatusType.PAUSADO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="internalNotesLabel" for="client-internalNotes">
                    <Translate contentKey="grupoamigoBackendApp.client.internalNotes">Internal Notes</Translate>
                  </Label>
                  <AvField id="client-internalNotes" type="text" name="internalNotes" />
                </AvGroup>
                <AvGroup>
                  <Label for="client-suppliers">
                    <Translate contentKey="grupoamigoBackendApp.client.suppliers">Suppliers</Translate>
                  </Label>
                  <AvInput id="client-suppliers" type="select" className="form-control" name="suppliers.id">
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
                <AvGroup>
                  <Label for="client-clients">
                    <Translate contentKey="grupoamigoBackendApp.client.clients">Clients</Translate>
                  </Label>
                  <AvInput id="client-clients" type="select" className="form-control" name="clients.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/client" replace color="info">
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
  clientEntity: storeState.client.entity,
  loading: storeState.client.loading,
  updating: storeState.client.updating,
  updateSuccess: storeState.client.updateSuccess
});

const mapDispatchToProps = {
  getCompanies,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientUpdate);
