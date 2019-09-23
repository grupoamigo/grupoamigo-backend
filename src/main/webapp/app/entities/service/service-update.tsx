import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './service.reducer';
import { IService } from 'app/shared/model/service.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IServiceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IServiceUpdateState {
  isNew: boolean;
}

export class ServiceUpdate extends React.Component<IServiceUpdateProps, IServiceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { serviceEntity } = this.props;
      const entity = {
        ...serviceEntity,
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
    this.props.history.push('/entity/service');
  };

  render() {
    const { serviceEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoamigoBackendApp.service.home.createOrEditLabel">
              <Translate contentKey="grupoamigoBackendApp.service.home.createOrEditLabel">Create or edit a Service</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : serviceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="service-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="service-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="service-title">
                    <Translate contentKey="grupoamigoBackendApp.service.title">Title</Translate>
                  </Label>
                  <AvField
                    id="service-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="service-description">
                    <Translate contentKey="grupoamigoBackendApp.service.description">Description</Translate>
                  </Label>
                  <AvField
                    id="service-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="service-type">
                    <Translate contentKey="grupoamigoBackendApp.service.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="service-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && serviceEntity.type) || 'CARGA'}
                  >
                    <option value="CARGA">{translate('grupoamigoBackendApp.ServiceType.CARGA')}</option>
                    <option value="DESCARGA">{translate('grupoamigoBackendApp.ServiceType.DESCARGA')}</option>
                    <option value="TRANSPORTE">{translate('grupoamigoBackendApp.ServiceType.TRANSPORTE')}</option>
                    <option value="IMPORTACION">{translate('grupoamigoBackendApp.ServiceType.IMPORTACION')}</option>
                    <option value="EXPORTACION">{translate('grupoamigoBackendApp.ServiceType.EXPORTACION')}</option>
                    <option value="ALMACENAJE">{translate('grupoamigoBackendApp.ServiceType.ALMACENAJE')}</option>
                    <option value="INSPECCION">{translate('grupoamigoBackendApp.ServiceType.INSPECCION')}</option>
                    <option value="REPARACION">{translate('grupoamigoBackendApp.ServiceType.REPARACION')}</option>
                    <option value="CROSS_DOCK">{translate('grupoamigoBackendApp.ServiceType.CROSS_DOCK')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="unitLabel" for="service-unit">
                    <Translate contentKey="grupoamigoBackendApp.service.unit">Unit</Translate>
                  </Label>
                  <AvInput
                    id="service-unit"
                    type="select"
                    className="form-control"
                    name="unit"
                    value={(!isNew && serviceEntity.unit) || 'TM'}
                  >
                    <option value="TM">{translate('grupoamigoBackendApp.ServiceUnitType.TM')}</option>
                    <option value="KG">{translate('grupoamigoBackendApp.ServiceUnitType.KG')}</option>
                    <option value="CONTENEDOR_20TM">{translate('grupoamigoBackendApp.ServiceUnitType.CONTENEDOR_20TM')}</option>
                    <option value="CONTENEDOR_40TM">{translate('grupoamigoBackendApp.ServiceUnitType.CONTENEDOR_40TM')}</option>
                    <option value="M2">{translate('grupoamigoBackendApp.ServiceUnitType.M2')}</option>
                    <option value="TARIMA">{translate('grupoamigoBackendApp.ServiceUnitType.TARIMA')}</option>
                    <option value="KM">{translate('grupoamigoBackendApp.ServiceUnitType.KM')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="service-status">
                    <Translate contentKey="grupoamigoBackendApp.service.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="service-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && serviceEntity.status) || 'PROCESANDO'}
                  >
                    <option value="PROCESANDO">{translate('grupoamigoBackendApp.StatusType.PROCESANDO')}</option>
                    <option value="CONFIRMADO">{translate('grupoamigoBackendApp.StatusType.CONFIRMADO')}</option>
                    <option value="ACTIVO">{translate('grupoamigoBackendApp.StatusType.ACTIVO')}</option>
                    <option value="EN_ESPERA">{translate('grupoamigoBackendApp.StatusType.EN_ESPERA')}</option>
                    <option value="TERMINADO">{translate('grupoamigoBackendApp.StatusType.TERMINADO')}</option>
                    <option value="CANCELADO">{translate('grupoamigoBackendApp.StatusType.CANCELADO')}</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/service" replace color="info">
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
  serviceEntity: storeState.service.entity,
  loading: storeState.service.loading,
  updating: storeState.service.updating,
  updateSuccess: storeState.service.updateSuccess
});

const mapDispatchToProps = {
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
)(ServiceUpdate);
