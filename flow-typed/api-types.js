declare type Response<T> = Success<T> | Failed

declare type Success<T> = {|
  fulfilled: true,
  value: T,
|}

declare type Failed = {|
  rejected: true,
  reason: {
    cause: {
      kind: any,
    },
  },
|}
