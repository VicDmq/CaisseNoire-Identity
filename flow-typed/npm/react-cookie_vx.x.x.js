// @flow
// flow-typed signature: 6f8035c5bd117a6ce1430eeb38272f4f
// flow-typed version: <<STUB>>/react-cookie_v4.0.1/flow_v0.109.0

declare module 'react-cookie' {
  declare export var CookiesProvider: any;

  declare type Options = {
    pathname?: string,
  };

  declare export function useCookies<T, U>([string]): [T, (string, U, Options) => void, (string, Options) => void];
}
