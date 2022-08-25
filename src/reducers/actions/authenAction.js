export function registerStart() {
  return {
    type: 'registerStart',
  };
}

export function registerSuccess(payload) {
  return {
    type: 'registerSuccess',
    payload,
  };
}

export function registerFailed(payload) {
  return {
    type: 'registerFailed',
    payload: payload,
  };
}

export function loginStart() {
  return {
    type: 'loginStart',
  };
}

export function loginSuccess(payload) {
  return {
    type: 'loginSuccess',
    payload,
  };
}

export function loginFailed(payload) {
  return {
    type: 'loginFailed',
    payload: payload,
  };
}
