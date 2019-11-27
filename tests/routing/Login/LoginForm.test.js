// @flow
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import LoginForm from '@Routing/Login/LoginForm'

import { DEFAULT_NOT_FOUND } from '../../utils/default'

describe('LoginForm', () => {
  it('Disables password input by default', () => {
    const { getByTestId } = render(<LoginForm signIn={jest.fn()} response={undefined} />)

    const passwordInput = getByTestId('password-input')

    expect(passwordInput).toBeDisabled()
  })

  it('Can enable password input', () => {
    const { getByTestId, getByRole } = render(<LoginForm signIn={jest.fn()} response={undefined} />)

    const adminCheckBox = getByRole((content, element) => element.getAttribute('type') === 'checkbox')

    fireEvent.click(adminCheckBox)

    const passwordInput = getByTestId('password-input')

    expect(passwordInput).toBeEnabled()
  })

  it('Disables or enables save button when required fields are empty or filled', () => {
    const { getByRole, getByTestId } = render(<LoginForm signIn={jest.fn()} response={undefined} />)

    const saveButton = getByRole('button')

    expect(saveButton).toBeDisabled()

    const teamNameInput = getByTestId('team-name-input')

    fireEvent.change(teamNameInput, { target: { value: 'name' } })

    expect(saveButton).toBeEnabled()

    const adminCheckBox = getByRole((content, element) => element.getAttribute('type') === 'checkbox')

    fireEvent.click(adminCheckBox)

    expect(saveButton).toBeDisabled()

    const passwordInput = getByTestId('password-input')

    fireEvent.change(passwordInput, { target: { value: 'password' } })

    expect(saveButton).toBeEnabled()
  })

  it('Shows loading and disables save button', () => {
    const { getByRole, getByTestId } = render(<LoginForm signIn={jest.fn()} response={{ pending: true }} />)

    const teamNameInput = getByTestId('team-name-input')
    fireEvent.change(teamNameInput, { target: { value: 'name' } })
    expect(teamNameInput).toHaveValue('name')

    const saveButton = getByRole('button')
    expect(saveButton).toHaveClass('ant-btn-loading')
    expect(saveButton).toBeDisabled()
  })

  it('Shows error', () => {
    const { getByTestId, rerender } = render(
      <LoginForm signIn={jest.fn()} response={{ rejected: true, reason: { cause: undefined } }} />
    )

    const errorMessage = getByTestId('error-message')

    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent("Une erreur s'est produite lors de la connexion")

    rerender(<LoginForm signIn={jest.fn()} response={{ rejected: true, reason: { cause: DEFAULT_NOT_FOUND } }} />)

    const errorMessage2 = getByTestId('error-message')

    expect(errorMessage2).toBeInTheDocument()
    expect(errorMessage2).toHaveTextContent("Nom d'équipe incorrect")
  })

  it('Hides error when user completes form', () => {
    const { getByTestId, rerender } = render(
      <LoginForm signIn={jest.fn()} response={{ rejected: true, reason: { cause: undefined } }} />
    )

    const errorMessage = getByTestId('error-message')
    expect(errorMessage).toBeInTheDocument()

    const teamNameInput = getByTestId('team-name-input')
    fireEvent.change(teamNameInput, { target: { value: 'name' } })

    expect(errorMessage).not.toBeInTheDocument()
  })

  it('Calls signIn and reset form on submit (except adminCheckBox)', () => {
    const signIn = jest.fn()

    const { getByTestId, getByRole } = render(<LoginForm signIn={signIn} response={undefined} />)

    const teamNameInput = getByTestId('team-name-input')
    fireEvent.change(teamNameInput, { target: { value: 'name' } })
    expect(teamNameInput).toHaveValue('name')

    const adminCheckBox = getByRole((content, element) => element.getAttribute('type') === 'checkbox')
    fireEvent.click(adminCheckBox)

    const passwordInput = getByTestId('password-input')
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    expect(passwordInput).toHaveValue('password')

    const saveButton = getByRole('button')
    fireEvent.click(saveButton)

    expect(signIn).toHaveBeenCalledWith({ name: 'name', admin_password: 'password' })
    expect(teamNameInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    expect(adminCheckBox).toBeChecked()
  })
})
