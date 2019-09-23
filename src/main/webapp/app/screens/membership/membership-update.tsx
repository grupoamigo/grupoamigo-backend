import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './membership.reducer';
import { IMembership } from 'app/shared/model/membership.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMembershipUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMembershipUpdateState {
  isNew: boolean;
  userId: string;
}

export class MembershipUpdate extends React.Component<IMembershipUpdateProps, IMembershipUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
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

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.created = convertDateTimeToServer(values.created);

    if (errors.length === 0) {
      const { membershipEntity } = this.props;
      const entity = {
        ...membershipEntity,
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
    this.props.history.push('/entity/membership');
  };

  render() {
    const { membershipEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="grupoamigoBackendApp.membership.home.createOrEditLabel">
              <Translate contentKey="grupoamigoBackendApp.membership.home.createOrEditLabel">Create or edit a Membership</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : membershipEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="membership-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="membership-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="roleLabel" for="membership-role">
                    <Translate contentKey="grupoamigoBackendApp.membership.role">Role</Translate>
                  </Label>
                  <AvInput
                    id="membership-role"
                    type="select"
                    className="form-control"
                    name="role"
                    value={(!isNew && membershipEntity.role) || 'CEO'}
                  >
                    <option value="CEO">{translate('grupoamigoBackendApp.MembershipRole.CEO')}</option>
                    <option value="VP">{translate('grupoamigoBackendApp.MembershipRole.VP')}</option>
                    <option value="JEFE_DE_DIVISION">{translate('grupoamigoBackendApp.MembershipRole.JEFE_DE_DIVISION')}</option>
                    <option value="SUPERVISOR">{translate('grupoamigoBackendApp.MembershipRole.SUPERVISOR')}</option>
                    <option value="INSPECTOR">{translate('grupoamigoBackendApp.MembershipRole.INSPECTOR')}</option>
                    <option value="VIGILANTE">{translate('grupoamigoBackendApp.MembershipRole.VIGILANTE')}</option>
                    <option value="CHOFER">{translate('grupoamigoBackendApp.MembershipRole.CHOFER')}</option>
                    <option value="ADMINISTRATIVO">{translate('grupoamigoBackendApp.MembershipRole.ADMINISTRATIVO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="createdLabel" for="membership-created">
                    <Translate contentKey="grupoamigoBackendApp.membership.created">Created</Translate>
                  </Label>
                  <AvInput
                    id="membership-created"
                    type="datetime-local"
                    className="form-control"
                    name="created"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.membershipEntity.created)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="expiresLabel" for="membership-expires">
                    <Translate contentKey="grupoamigoBackendApp.membership.expires">Expires</Translate>
                  </Label>
                  <AvField id="membership-expires" type="date" className="form-control" name="expires" />
                </AvGroup>
                <AvGroup>
                  <Label id="accountLevelLabel" for="membership-accountLevel">
                    <Translate contentKey="grupoamigoBackendApp.membership.accountLevel">Account Level</Translate>
                  </Label>
                  <AvInput
                    id="membership-accountLevel"
                    type="select"
                    className="form-control"
                    name="accountLevel"
                    value={(!isNew && membershipEntity.accountLevel) || 'FREE'}
                  >
                    <option value="FREE">{translate('grupoamigoBackendApp.MembershipLevelType.FREE')}</option>
                    <option value="BASIC">{translate('grupoamigoBackendApp.MembershipLevelType.BASIC')}</option>
                    <option value="PRO">{translate('grupoamigoBackendApp.MembershipLevelType.PRO')}</option>
                    <option value="ENTERPRISE">{translate('grupoamigoBackendApp.MembershipLevelType.ENTERPRISE')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="membership-user">
                    <Translate contentKey="grupoamigoBackendApp.membership.user">User</Translate>
                  </Label>
                  <AvInput id="membership-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.email}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/membership" replace color="info">
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
  users: storeState.userManagement.users,
  membershipEntity: storeState.membership.entity,
  loading: storeState.membership.loading,
  updating: storeState.membership.updating,
  updateSuccess: storeState.membership.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
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
)(MembershipUpdate);
