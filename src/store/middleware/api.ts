import axios from 'axios';
import { Middleware } from 'redux';
import * as actions from '../api';
import { RootState } from '../store';

const baseURL = 'https://yalantis-react-school-api.yalantis.com/api/task0';

const api: Middleware<{}, RootState> =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    try {
      const response = await axios.request({
        baseURL,
        url,
        method,
        data,
      });
      dispatch(actions.apiCallSuccess(response.data));

      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data });
      }
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message));

      if (onError) {
        dispatch({ type: onError, payload: error.message });
      }
    }
  };

export default api;
