declare opaque type Uuid: string

declare type Response<T> = Success<T> | Failed

declare type Success<T> = {|
  fulfilled: true,
  value: T
|}

declare type Failed = {|
  rejected: true,
  reason: {
    cause: {
      kind: any
    }
  }
|}

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
  kind: BasicKind | MultiplicationKind | TimeMultiplicationKind | RegularIntervalsKind
}

declare type RuleCategory = 'TRAINING_DAY' | 'GAME_DAY'

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

declare type CreateSanction = {
  team_id: Uuid,
  user_id?: Uuid,
  sanction_info?: SanctionInfo
}

declare type SanctionInfo = {
  associated_rule: ?Uuid,
  sanction_data: SanctionData
}

declare type SanctionData = BasicSanctionData | MultiplicationSanctionData | TimeMultiplicationSanctionData

declare type BasicSanctionData = {
  type: 'BASIC'
}

declare type MultiplicationSanctionData = {
  type: 'MULTIPLICATION',
  multiple: number
}

declare type TimeMultiplicationSanctionData = {
  type: 'TIME_MULTIPLICATION',
  times_unit: number
}
