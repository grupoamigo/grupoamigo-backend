import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './service-request.reducer';
import { IServiceRequest } from 'app/shared/model/service-request.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IServiceRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IServiceRequestUpdateState {
  isNew: boolean;
}

export class ServiceRequestUpdate extends React.Component<IServiceRequestUpdateProps, IServiceRequestUpdateState> {
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
    values.dateRequested = convertDateTimeToServer(values.dateRequested);

    if (errors.length === 0) {
      const { serviceRequestEntity } = this.props;
      const entity = {
        ...serviceRequestEntity,
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
    this.props.history.push('/entity/service-request');
  };

  render() {
    const { serviceRequestEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoamigoBackendApp.serviceRequest.home.createOrEditLabel">
              <Translate contentKey="grupoamigoBackendApp.serviceRequest.home.createOrEditLabel">Create or edit a ServiceRequest</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : serviceRequestEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="service-request-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="service-request-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="service-request-title">
                    <Translate contentKey="grupoamigoBackendApp.serviceRequest.title">Title</Translate>
                  </Label>
                  <AvField
                    id="service-request-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="service-request-description">
                    <Translate contentKey="grupoamigoBackendApp.serviceRequest.description">Description</Translate>
                  </Label>
                  <AvField
                    id="service-request-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateRequestedLabel" for="service-request-dateRequested">
                    <Translate contentKey="grupoamigoBackendApp.serviceRequest.dateRequested">Date Requested</Translate>
                  </Label>
                  <AvInput
                    id="service-request-dateRequested"
                    type="datetime-local"
                    className="form-control"
                    name="dateRequested"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.serviceRequestEntity.dateRequested)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateBeginLabel" for="service-request-dateBegin">
                    <Translate contentKey="grupoamigoBackendApp.serviceRequest.dateBegin">Date Begin</Translate>
                  </Label>
                  <AvField
                    id="service-request-dateBegin"
                    type="date"
                    className="form-control"
                    name="dateBegin"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateEndLabel" for="service-request-dateEnd">
                    <Translate contentKey="grupoamigoBackendApp.serviceRequest.dateEnd">Date End</Translate>
                  </Label>
                  <AvField id="service-request-dateEnd" type="date" className="form-control" name="dateEnd" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="service-request-status">
                    <Translate contentKey="grupoamigoBackendApp.serviceRequest.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="service-request-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && serviceRequestEntity.status) || 'PROCESANDO'}
                  >
                    <option value="PROCESANDO">{translate('grupoamigoBackendApp.StatusType.PROCESANDO')}</option>
                    <option value="CONFIRMADO">{translate('grupoamigoBackendApp.StatusType.CONFIRMADO')}</option>
                    <option value="ACTIVO">{translate('grupoamigoBackendApp.StatusType.ACTIVO')}</option>
                    <option value="EN_ESPERA">{translate('grupoamigoBackendApp.StatusType.EN_ESPERA')}</option>
                    <option value="TERMINADO">{translate('grupoamigoBackendApp.StatusType.TERMINADO')}</option>
                    <option value="CANCELADO">{translate('grupoamigoBackendApp.StatusType.CANCELADO')}</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/service-request" replace color="info">
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
  serviceRequestEntity: storeState.serviceRequest.entity,
  loading: storeState.serviceRequest.loading,
  updating: storeState.serviceRequest.updating,
  updateSuccess: storeState.serviceRequest.updateSuccess
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
)(ServiceRequestUpdate);
