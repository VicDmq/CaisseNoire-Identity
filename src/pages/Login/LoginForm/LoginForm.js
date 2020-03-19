// @flow
import React, { useState } from 'react';
import { Row, Col, Form, Button, Checkbox, Icon } from 'antd';

import Input from '@Components/common/Input/Input';
import FormItem from '@Components/common/FormItem/FormItem';
import type { Response, Reason } from '@Components/utils/Connect';

import STYLES from './LoginForm.less';

type LoginFormProps = {
  signIn: (LoginRequest) => void,
  response: ?Response<LoginResponse>,
};

type LoginFormState = {
  credentials: LoginRequest,
  adminMode: boolean,
  hideError: boolean,
};

const LoginForm = (props: LoginFormProps) => {
  const [state, setState] = useState<LoginFormState>({
    credentials: { name: '' },
    adminMode: false,
    hideError: false,
  });

  const resetForm = () => {
    setState({ ...state, credentials: { name: '' }, hideError: false });
  };

  const updateCredentials = (credentials: LoginRequest) => {
    setState({
      ...state,
      credentials,
      hideError: true,
    });
  };

  const updateAdminMode = () => {
    setState({
      credentials: state.adminMode ? { name: state.credentials.name } : state.credentials,
      adminMode: !state.adminMode,
      hideError: true,
    });
  };

  const signIn = () => {
    props.signIn(state.credentials);
    resetForm();
  };

  const getError = (reason: Reason): string => {
    let error = "Une erreur s'est produite lors de la connexion";

    if (reason.cause) {
      switch (reason.cause.kind) {
        case 'NOT_FOUND':
          error = `Nom d'équipe ${state.adminMode ? 'ou mot de passe' : ''} incorrect`;
      }
    }

    return error;
  };

  const loading = !!props.response && !!props.response.pending && props.response.pending;

  const saveDisabled =
    loading || state.credentials.name === '' || (state.adminMode && !state.credentials.admin_password);

  return (
    <Row type='flex' justify='center' align='middle' className={STYLES.row}>
      <Col xs={{ span: 18 }} lg={{ span: 8 }} className={STYLES.formContainer}>
        <Form colon={false}>
          <FormItem label="Nom de l'équipe">
            <Input
              value={state.credentials.name}
              onChange={(value) =>
                updateCredentials({
                  ...state.credentials,
                  name: value,
                })
              }
              testId='team-name-input'
            />
          </FormItem>
          <FormItem label='Mot de passe' disabled={!state.adminMode}>
            <Input
              disabled={!state.adminMode}
              value={state.credentials.admin_password}
              onChange={(value) =>
                updateCredentials({
                  ...state.credentials,
                  admin_password: value === '' ? undefined : value,
                })
              }
              password
              testId='password-input'
            />
          </FormItem>
          <Checkbox checked={state.adminMode} onChange={updateAdminMode} className={STYLES.checkbox}>
            Mode administrateur
          </Checkbox>
          {props.response && props.response.rejected && !state.hideError && (
            <div className={STYLES.errorMessage} test-id='error-message'>
              <Icon type='exclamation-circle' theme='filled' />
              {getError(props.response.reason)}
            </div>
          )}
          <Row type='flex' justify='center'>
            <Button
              type='primary'
              onClick={signIn}
              disabled={saveDisabled}
              loading={loading}
              className={STYLES.saveButton}
            >
              {loading ? '' : 'Connexion'}
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
