// @flow
import React, { type AbstractComponent } from 'react'
import { Spin, Result } from 'antd'

export type Response<T> = Success<T> | Failed

type Success<T> = {|
  fulfilled: true,
  value: T
|}

type Failed = {|
  rejected: true,
  reason: Reason
|}

export type Reason = {
  cause: ?ApiError
}

type WithConnect<T> = { response: Response<any>, mapResponseToProps: (any[]) => T }

const withConnect = <Props, OtherProps>(
  WrappedComponent: AbstractComponent<Props & OtherProps>
): AbstractComponent<WithConnect<Props> & OtherProps> => {
  // $FlowFixMe: Should accept (WithConnect<Props> & OtherProps)
  return ({ response, mapResponseToProps, ...otherProps }: WithConnect<Props> & OtherProps) => {
    if (response.rejected) {
      return (
        <Result
          status='error'
          title='Échec du chargement'
          subTitle="Une erreur s'est produite pendant le chargement des données"
        />
      )
    }
    if (response.fulfilled) {
      return <WrappedComponent {...mapResponseToProps(response.value)} {...otherProps} />
    }

    return <Spin size={'large'} />
  }
}

export default withConnect
