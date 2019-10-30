// @flow
import React, { type Node } from 'react'
import { Form } from 'antd'

import STYLES from './styles.less'

const { Item } = Form

type LabelProps = {
  label: string,
  error?: boolean
}

const Label = (props: LabelProps) => {
  return <span className={props.error ? STYLES.labelError : ''}>{props.label}</span>
}

type FormItemProps = {
  label: string,
  error?: boolean,
  reason?: string,
  children: Node
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
    <Item label={<Label label={props.label} error={props.error} />} {...getFormItemProps()} hasFeedback>
      {props.children}
    </Item>
  )
}

export default FormItem
