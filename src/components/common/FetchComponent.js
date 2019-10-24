// @flow
import React, { type Node } from 'react'
import { connect } from 'react-refetch'
import type { Match } from 'react-router-dom'
import { Button } from 'reactstrap'

const FetchComponent = ({
  response,
  render
}: {
  response: Response<any>,
  render: any => Node,
}) => {
  if (response.rejected) {
    return <div>Erreur... {response.reason.cause.kind}</div>
  }
  if (response.fulfilled) {
    return render(response.value)
  }

  return <div>Loading...</div>
}

export default FetchComponent
