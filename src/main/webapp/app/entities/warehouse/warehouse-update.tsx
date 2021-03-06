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
import { ILoad } from 'app/shared/model/load.model';
import { getEntities as getLoads } from 'app/entities/load/load.reducer';
import { getEntity, updateEntity, createEntity, reset } from './warehouse.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWarehouseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IWarehouseUpdateState {
  isNew: boolean;
  ownerId: string;
  loadListId: string;
  loadId: string;
}

export class WarehouseUpdate extends React.Component<IWarehouseUpdateProps, IWarehouseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: '0',
      loadListId: '0',
      loadId: '0',
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
    this.props.getLoads();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { warehouseEntity } = this.props;
      const entity = {
        ...warehouseEntity,
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
    this.props.history.push('/entity/warehouse');
  };

  render() {
    const { warehouseEntity, companies, loads, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoamigoBackendApp.warehouse.home.createOrEditLabel">
              <Translate contentKey="grupoamigoBackendApp.warehouse.home.createOrEditLabel">Create or edit a Warehouse</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : warehouseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="warehouse-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="warehouse-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="warehouse-name">
                    <Translate contentKey="grupoamigoBackendApp.warehouse.name">Name</Translate>
                  </Label>
                  <AvField
                    id="warehouse-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="divisionLabel" for="warehouse-division">
                    <Translate contentKey="grupoamigoBackendApp.warehouse.division">Division</Translate>
                  </Label>
                  <AvInput
                    id="warehouse-division"
                    type="select"
                    className="form-control"
                    name="division"
                    value={(!isNew && warehouseEntity.division) || 'INTERMODAL'}
                  >
                    <option value="INTERMODAL">{translate('grupoamigoBackendApp.DivisionType.INTERMODAL')}</option>
                    <option value="FERTILIZANTES">{translate('grupoamigoBackendApp.DivisionType.FERTILIZANTES')}</option>
                    <option value="POLIETILENO">{translate('grupoamigoBackendApp.DivisionType.POLIETILENO')}</option>
                    <option value="TUBERIA">{translate('grupoamigoBackendApp.DivisionType.TUBERIA')}</option>
                    <option value="LACTEOS">{translate('grupoamigoBackendApp.DivisionType.LACTEOS')}</option>
                    <option value="CERVEZA">{translate('grupoamigoBackendApp.DivisionType.CERVEZA')}</option>
                    <option value="SAGARPA">{translate('grupoamigoBackendApp.DivisionType.SAGARPA')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="warehouse-owner">
                    <Translate contentKey="grupoamigoBackendApp.warehouse.owner">Owner</Translate>
                  </Label>
                  <AvInput id="warehouse-owner" type="select" className="form-control" name="owner.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/warehouse" replace color="info">
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
  loads: storeState.load.entities,
  warehouseEntity: storeState.warehouse.entity,
  loading: storeState.warehouse.loading,
  updating: storeState.warehouse.updating,
  updateSuccess: storeState.warehouse.updateSuccess
});

const mapDispatchToProps = {
  getCompanies,
  getLoads,
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
)(WarehouseUpdate);
