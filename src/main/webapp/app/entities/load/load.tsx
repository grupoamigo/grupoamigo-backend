import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './load.reducer';
import { ILoad } from 'app/shared/model/load.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILoadProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ILoadState {
  search: string;
}

export class Load extends React.Component<ILoadProps, ILoadState> {
  state: ILoadState = {
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
    const { loadList, match } = this.props;
    return (
      <div>
        <h2 id="load-heading">
          <Translate contentKey="grupoamigoBackendApp.load.home.title">Loads</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoamigoBackendApp.load.home.createLabel">Create a new Load</Translate>
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
                    placeholder={translate('grupoamigoBackendApp.load.home.search')}
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
          {loadList && loadList.length > 0 ? (
            <Table responsive aria-describedby="load-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.load.type">Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.load.uniqueId">Unique Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.load.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.load.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.load.warehouse">Warehouse</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.load.drivers">Drivers</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.load.warehouses">Warehouses</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {loadList.map((load, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${load.id}`} color="link" size="sm">
                        {load.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`grupoamigoBackendApp.LoadType.${load.type}`} />
                    </td>
                    <td>{load.uniqueId}</td>
                    <td>{load.description}</td>
                    <td>
                      <Translate contentKey={`grupoamigoBackendApp.LoadStatusType.${load.status}`} />
                    </td>
                    <td>{load.warehouse ? <Link to={`warehouse/${load.warehouse.id}`}>{load.warehouse.name}</Link> : ''}</td>
                    <td>
                      {load.drivers
                        ? load.drivers.map((val, j) => (
                            <span key={j}>
                              <Link to={`driver/${val.id}`}>{val.officialId}</Link>
                              {j === load.drivers.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>{load.warehouses ? <Link to={`warehouse/${load.warehouses.id}`}>{load.warehouses.name}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${load.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${load.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${load.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoamigoBackendApp.load.home.notFound">No Loads found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ load }: IRootState) => ({
  loadList: load.entities
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
)(Load);
