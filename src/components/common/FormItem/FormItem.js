// @flow
import React, { type Node } from 'react'
import { Form } from 'antd'
import classNames from 'classnames/bind'

import STYLES from './styles.less'

const { Item } = Form

type LabelProps = {
  label: string,
  error?: boolean,
  disabled?: boolean
}

const Label = (props: LabelProps) => {
  const cx = classNames.bind(STYLES)
  return <span className={cx({ labelError: props.error, labelDisabled: props.disabled })}>{props.label}</span>
}

type FormItemProps = {
  label: string,
  error?: boolean,
  reason?: string,
  children: Node,
  disabled?: boolean
}

const FormItem = (props: FormItemProps) => {
  const getFormItemProps = () => {
    return props.error
      ? {
        validateStatus: 'error',
        help: props.reason
      }
      : {}
  }
  return (
    <Item
      label={<Label label={props.label} error={props.error} disabled={props.disabled} />}
      {...getFormItemProps()}
      hasFeedback
    >
      {props.children}
    </Item>
  )
}

export default FormItem
