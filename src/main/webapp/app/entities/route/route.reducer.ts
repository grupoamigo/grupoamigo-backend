import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRoute, defaultValue } from 'app/shared/model/route.model';

export const ACTION_TYPES = {
  SEARCH_ROUTES: 'route/SEARCH_ROUTES',
  FETCH_ROUTE_LIST: 'route/FETCH_ROUTE_LIST',
  FETCH_ROUTE: 'route/FETCH_ROUTE',
  CREATE_ROUTE: 'route/CREATE_ROUTE',
  UPDATE_ROUTE: 'route/UPDATE_ROUTE',
  DELETE_ROUTE: 'route/DELETE_ROUTE',
  RESET: 'route/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRoute>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RouteState = Readonly<typeof initialState>;

// Reducer

export default (state: RouteState = initialState, action): RouteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ROUTES):
    case REQUEST(ACTION_TYPES.FETCH_ROUTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ROUTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ROUTE):
    case REQUEST(ACTION_TYPES.UPDATE_ROUTE):
    case REQUEST(ACTION_TYPES.DELETE_ROUTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_ROUTES):
    case FAILURE(ACTION_TYPES.FETCH_ROUTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ROUTE):
    case FAILURE(ACTION_TYPES.CREATE_ROUTE):
    case FAILURE(ACTION_TYPES.UPDATE_ROUTE):
    case FAILURE(ACTION_TYPES.DELETE_ROUTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ROUTES):
    case SUCCESS(ACTION_TYPES.FETCH_ROUTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROUTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ROUTE):
    case SUCCESS(ACTION_TYPES.UPDATE_ROUTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ROUTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/routes';
const apiSearchUrl = 'api/_search/routes';

// Actions

export const getSearchEntities: ICrudSearchAction<IRoute> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ROUTES,
  payload: axios.get<IRoute>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IRoute> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ROUTE_LIST,
  payload: axios.get<IRoute>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRoute> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ROUTE,
    payload: axios.get<IRoute>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRoute> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ROUTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRoute> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ROUTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRoute> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ROUTE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
