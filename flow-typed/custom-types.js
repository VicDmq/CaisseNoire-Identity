declare opaque type Uuid: string

declare type Response<T> = Success<T> | Failed

declare type Success<T> = {|
  fulfilled: true,
  value: T
|}

declare type Failed = {|
  rejected: true,
  reason: Reason
|}

type Reason = {
  cause: {
    kind: any,
    description: string
  }
}

declare type Team = {
  id: Uuid,
  name: string,
  rules: Rule[]
}

declare type Rule = {
  id: Uuid,
  name: string,
  description: string,
  category: RuleCategory,
  kind: RuleKind
}

declare type RuleCategory = 'TRAINING_DAY' | 'GAME_DAY'

declare type RuleKind = BasicKind | MultiplicationKind | TimeMultiplicationKind | RegularIntervalsKind

declare type BasicKind = {
  type: 'BASIC',
  price: number
}

declare type MultiplicationKind = {
  type: 'MULTIPLICATION',
  price_to_multiply: number
}

declare type TimeMultiplicationKind = {
  type: 'TIME_MULTIPLICATION',
  price_per_time_unit: number,
  time_unit: TimeUnit
}

declare type RegularIntervalsKind = {
  type: 'REGULAR_INTERVALS',
  price: number,
  interval_in_time_unit: number,
  time_unit: TimeUnit
}

declare type TimeUnit = 'SECOND' | 'MINUTE' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'

declare type User = {
  id: Uuid,
  team_id: Uuid,
  lastname: string,
  firstname: string,
  nickname: ?string,
  email: ?string
}

declare type Sanction = {
  id: Uuid,
  team_id: Uuid,
  user_id: Uuid,
  sanction_info: SanctionInfo,
  price: number
}

declare type CreateSanction = {
  user_id?: ?Uuid,
  sanction_info?: SanctionInfo
}

declare type SanctionInfo = {
  associated_rule: ?Uuid,
  extra_info: ?ExtraInfo
}

declare type ExtraInfo = None | Multiplication

declare type None = {
  type: 'NONE'
}

declare type Multiplication = {
  type: 'MULTIPLICATION',
  factor: number
}
