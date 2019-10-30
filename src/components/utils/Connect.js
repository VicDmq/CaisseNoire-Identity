// @flow
import React, { type AbstractComponent } from 'react'

type WithConnect<T> = { response: Response<any>, mapResponseToProps: (any[]) => T }

const withConnect = <Props, OtherProps>(
  WrappedComponent: AbstractComponent<Props & OtherProps>
): AbstractComponent<WithConnect<Props> & OtherProps> => {
  // $FlowFixMe: Should accept (WithConnect<Props> & OtherProps)
  return ({ response, mapResponseToProps, ...otherProps }: WithConnect<Props> & OtherProps) => {
    if (response.rejected) {
      return <div>Erreur... {response.reason.cause.kind}</div>
    }
    if (response.fulfilled) {
      return <WrappedComponent {...mapResponseToProps(response.value)} {...otherProps} />
    }

    return <div>Loading...</div>
  }
}

export default withConnect
