import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './service.reducer';
import { IService } from 'app/shared/model/service.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IServiceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IServiceState {
  search: string;
}

export class Service extends React.Component<IServiceProps, IServiceState> {
  state: IServiceState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      this.props.getEntities();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { serviceList, match } = this.props;
    return (
      <div>
        <h2 id="service-heading">
          <Translate contentKey="grupoamigoBackendApp.service.home.title">Services</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoamigoBackendApp.service.home.createLabel">Create a new Service</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('grupoamigoBackendApp.service.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          {serviceList && serviceList.length > 0 ? (
            <Table responsive aria-describedby="service-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.service.title">Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.service.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.service.type">Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.service.unit">Unit</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.service.status">Status</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {serviceList.map((service, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${service.id}`} color="link" size="sm">
                        {service.id}
                      </Button>
                    </td>
                    <td>{service.title}</td>
                    <td>{service.description}</td>
                    <td>
                      <Translate contentKey={`grupoamigoBackendApp.ServiceType.${service.type}`} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoamigoBackendApp.ServiceUnitType.${service.unit}`} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoamigoBackendApp.StatusType.${service.status}`} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${service.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${service.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${service.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="grupoamigoBackendApp.service.home.notFound">No Services found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ service }: IRootState) => ({
  serviceList: service.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Service);
