// @flow
import React, { useState } from 'react'
import { connect } from 'react-refetch'
import { useHistory } from 'react-router-dom'
import { Row, Col, Form, Button, Checkbox, Icon } from 'antd'

import Input from '@Components/common/Input'
import type { Reason } from '@Components/utils/Connect'

import STYLES from './login.less'

type LoginProps = {
  setCookie: (Uuid, boolean) => void,
  login: (LoginRequest, (LoginResponse) => void, (Reason) => void) => void
}

type LoginState = {
  credentials: LoginRequest,
  adminMode: boolean,
  loading: boolean,
  error?: ?string
}

const Login = (props: LoginProps) => {
  const [state, setState] = useState<LoginState>({ credentials: { name: '' }, adminMode: false, loading: false })
  const history = useHistory()

  const updateCredentials = (credentials: LoginRequest) => {
    setState({
      ...state,
      error: undefined,
      credentials
    })
  }

  const updateAdminMode = () => {
    setState({
      ...state,
      credentials: state.adminMode ? { name: state.credentials.name } : state.credentials,
      adminMode: !state.adminMode
    })
  }

  const signIn = () => {
    setState({ ...state, loading: true })
    props.login(state.credentials, response => onSuccess(response), reason => onError(reason))
  }

  const onSuccess = (response: LoginResponse) => {
    props.setCookie(response.id, !!response.admin_password)
    let { from } = history.location.state || { from: '/sanctions' }
    history.push({ pathname: from })
  }

  const onError = (reason: Reason) => {
    let error = "Une erreur s'est produite lors de la connexion"

    if (reason.cause) {
      switch (reason.cause.kind) {
        case 'NOT_FOUND':
          error = `Nom d'équipe ${state.adminMode ? 'ou mot de passe' : ''} incorrect`
      }
    }

    setState({ ...state, credentials: { name: '' }, loading: false, error })
  }

  const saveDisabled = state.credentials.name === '' || (state.adminMode && !state.credentials.admin_password)

  return (
    <Row type='flex' justify='center' align='middle' className={STYLES.row}>
      <Col xs={{ span: 18 }} lg={{ span: 8 }} className={STYLES.formContainer}>
        <Form colon={false}>
          <Input
            label="Nom de l'équipe"
            value={state.credentials.name}
            onChange={value =>
              updateCredentials({
                ...state.credentials,
                name: value
              })
            }
          />
          <Input
            label='Mot de passe'
            disabled={!state.adminMode}
            value={state.credentials.admin_password}
            onChange={value =>
              updateCredentials({
                ...state.credentials,
                admin_password: value === '' ? undefined : value
              })
            }
            password
          />
          <Checkbox checked={state.adminMode} onChange={updateAdminMode} className={STYLES.checkbox}>
            Mode administrateur
          </Checkbox>
          {state.error && (
            <div className={STYLES.errorMessage}>
              <Icon type='exclamation-circle' theme='filled' />
              {state.error}
            </div>
          )}
          <Row type='flex' justify='center'>
            <Button
              type='primary'
              onClick={signIn}
              disabled={saveDisabled}
              loading={state.loading}
              className={STYLES.saveButton}
            >
              {state.loading ? '' : 'Connexion'}
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default connect(({ rootUrl }: { rootUrl: string }) => {
  return {
    login: (request: LoginRequest, cb: LoginResponse => void, errCb: Reason => void) => ({
      loginResponse: {
        url: `${rootUrl}/login`,
        method: 'POST',
        force: true,
        body: JSON.stringify(request),
        then: response => cb(response),
        catch: reason => errCb(reason)
      }
    })
  }
})(Login)
