import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWarehouse } from 'app/shared/model/warehouse.model';
import { getEntities as getWarehouses } from 'app/entities/warehouse/warehouse.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { getEntities as getDrivers } from 'app/entities/driver/driver.reducer';
import { getEntity, updateEntity, createEntity, reset } from './load.reducer';
import { ILoad } from 'app/shared/model/load.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILoadUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILoadUpdateState {
  isNew: boolean;
  idsdrivers: any[];
  warehouseId: string;
  warehousesId: string;
}

export class LoadUpdate extends React.Component<ILoadUpdateProps, ILoadUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsdrivers: [],
      warehouseId: '0',
      warehousesId: '0',
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

    this.props.getWarehouses();
    this.props.getDrivers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { loadEntity } = this.props;
      const entity = {
        ...loadEntity,
        ...values,
        drivers: mapIdList(values.drivers)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/load');
  };

  render() {
    const { loadEntity, warehouses, drivers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoamigoBackendApp.load.home.createOrEditLabel">
              <Translate contentKey="grupoamigoBackendApp.load.home.createOrEditLabel">Create or edit a Load</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : loadEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="load-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="load-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="load-type">
                    <Translate contentKey="grupoamigoBackendApp.load.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="load-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && loadEntity.type) || 'CONTENEDOR'}
                  >
                    <option value="CONTENEDOR">{translate('grupoamigoBackendApp.LoadType.CONTENEDOR')}</option>
                    <option value="GRANEL">{translate('grupoamigoBackendApp.LoadType.GRANEL')}</option>
                    <option value="PALLETS">{translate('grupoamigoBackendApp.LoadType.PALLETS')}</option>
                    <option value="TUBERIA">{translate('grupoamigoBackendApp.LoadType.TUBERIA')}</option>
                    <option value="CERVEZA">{translate('grupoamigoBackendApp.LoadType.CERVEZA')}</option>
                    <option value="LECHE">{translate('grupoamigoBackendApp.LoadType.LECHE')}</option>
                    <option value="POLIETILENO">{translate('grupoamigoBackendApp.LoadType.POLIETILENO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="uniqueIdLabel" for="load-uniqueId">
                    <Translate contentKey="grupoamigoBackendApp.load.uniqueId">Unique Id</Translate>
                  </Label>
                  <AvField
                    id="load-uniqueId"
                    type="text"
                    name="uniqueId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="load-description">
                    <Translate contentKey="grupoamigoBackendApp.load.description">Description</Translate>
                  </Label>
                  <AvField id="load-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="load-status">
                    <Translate contentKey="grupoamigoBackendApp.load.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="load-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && loadEntity.status) || 'ESPERANDO_CARGA'}
                  >
                    <option value="ESPERANDO_CARGA">{translate('grupoamigoBackendApp.LoadStatusType.ESPERANDO_CARGA')}</option>
                    <option value="ESPERANDO_DESCARGA">{translate('grupoamigoBackendApp.LoadStatusType.ESPERANDO_DESCARGA')}</option>
                    <option value="EN_TRANSITO_MARITIMO">{translate('grupoamigoBackendApp.LoadStatusType.EN_TRANSITO_MARITIMO')}</option>
                    <option value="EN_TRANSITO_TERRESTRE">{translate('grupoamigoBackendApp.LoadStatusType.EN_TRANSITO_TERRESTRE')}</option>
                    <option value="EN_ADUANA">{translate('grupoamigoBackendApp.LoadStatusType.EN_ADUANA')}</option>
                    <option value="ENTREGADO">{translate('grupoamigoBackendApp.LoadStatusType.ENTREGADO')}</option>
                    <option value="EN_INSPECCION">{translate('grupoamigoBackendApp.LoadStatusType.EN_INSPECCION')}</option>
                    <option value="PERDIDO">{translate('grupoamigoBackendApp.LoadStatusType.PERDIDO')}</option>
                    <option value="DANADO">{translate('grupoamigoBackendApp.LoadStatusType.DANADO')}</option>
                    <option value="ROBADO">{translate('grupoamigoBackendApp.LoadStatusType.ROBADO')}</option>
                    <option value="EN_REPARACION">{translate('grupoamigoBackendApp.LoadStatusType.EN_REPARACION')}</option>
                    <option value="TRANSFORMADA">{translate('grupoamigoBackendApp.LoadStatusType.TRANSFORMADA')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="load-warehouse">
                    <Translate contentKey="grupoamigoBackendApp.load.warehouse">Warehouse</Translate>
                  </Label>
                  <AvInput id="load-warehouse" type="select" className="form-control" name="warehouse.id">
                    <option value="" key="0" />
                    {warehouses
                      ? warehouses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="load-drivers">
                    <Translate contentKey="grupoamigoBackendApp.load.drivers">Drivers</Translate>
                  </Label>
                  <AvInput
                    id="load-drivers"
                    type="select"
                    multiple
                    className="form-control"
                    name="drivers"
                    value={loadEntity.drivers && loadEntity.drivers.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {drivers
                      ? drivers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.officialId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="load-warehouses">
                    <Translate contentKey="grupoamigoBackendApp.load.warehouses">Warehouses</Translate>
                  </Label>
                  <AvInput id="load-warehouses" type="select" className="form-control" name="warehouses.id">
                    <option value="" key="0" />
                    {warehouses
                      ? warehouses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/load" replace color="info">
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
  warehouses: storeState.warehouse.entities,
  drivers: storeState.driver.entities,
  loadEntity: storeState.load.entity,
  loading: storeState.load.loading,
  updating: storeState.load.updating,
  updateSuccess: storeState.load.updateSuccess
});

const mapDispatchToProps = {
  getWarehouses,
  getDrivers,
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
)(LoadUpdate);
