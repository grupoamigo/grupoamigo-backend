import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IClientState {
  search: string;
}

export class Client extends React.Component<IClientProps, IClientState> {
  state: IClientState = {
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
    const { clientList, match } = this.props;
    return (
      <div>
        <h2 id="client-heading">
          <Translate contentKey="grupoamigoBackendApp.client.home.title">Clients</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="grupoamigoBackendApp.client.home.createLabel">Create a new Client</Translate>
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
                    placeholder={translate('grupoamigoBackendApp.client.home.search')}
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
          {clientList && clientList.length > 0 ? (
            <Table responsive aria-describedby="client-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.client.uniqueId">Unique Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.client.memberSince">Member Since</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.client.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.client.internalNotes">Internal Notes</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.client.suppliers">Suppliers</Translate>
                  </th>
                  <th>
                    <Translate contentKey="grupoamigoBackendApp.client.clients">Clients</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clientList.map((client, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${client.id}`} color="link" size="sm">
                        {client.id}
                      </Button>
                    </td>
                    <td>{client.uniqueId}</td>
                    <td>
                      <TextFormat type="date" value={client.memberSince} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <Translate contentKey={`grupoamigoBackendApp.ClientStatusType.${client.status}`} />
                    </td>
                    <td>{client.internalNotes}</td>
                    <td>{client.suppliers ? <Link to={`company/${client.suppliers.id}`}>{client.suppliers.legalName}</Link> : ''}</td>
                    <td>{client.clients ? <Link to={`company/${client.clients.id}`}>{client.clients.legalName}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${client.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${client.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${client.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="grupoamigoBackendApp.client.home.notFound">No Clients found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ client }: IRootState) => ({
  clientList: client.entities
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
)(Client);
