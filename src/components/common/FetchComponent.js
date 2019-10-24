// @flow
import React, { type Node } from 'react'
import { connect } from 'react-refetch'
import type { Match } from 'react-router-dom'
import { Button } from 'reactstrap'

export type Response<T> = Success<T> | Failed

type Success<T> = {|
  fulfilled: true,
  value: T,
|}

type Failed = {|
  rejected: true,
  reason: {
    cause: {
      kind: any,
    },
  },
|}

type FetchComponentProps<T> = {
  response: Response<T>,
  render: T => Node,
}

export const FetchComponent = <T>(props: FetchComponentProps<T>) => {
  if (props.response.rejected) {
    return <div>Erreur... {props.response.reason.cause.kind}</div>
  }
  if (props.response.fulfilled) {
    return props.render(props.response.value)
  }

  return <div>Loading...</div>
}
