declare opaque type Uuid: string

type ApiError = {
  kind: ErrorKind,
  description: string
}

type ErrorKind =
  | 'SERVICE_UNAVAILABLE'
  | 'UNKNOWN'
  | 'NOT_FOUND'
  | 'JSON'
  | 'BAD_REFERENCE'
  | 'DUPLICATED_FIELD'
  | 'BAD_PARAMETER'

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

declare type RuleKind = BasicKind | MultiplicationKind | TimeMultiplicationKind | MonthlyKind

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

declare type MonthlyKind = {
  type: 'MONTHLY',
  price: number
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

declare type LoginRequest = {
  name: string,
  admin_password?: string
}

declare type LoginResponse = {
  id: Uuid,
  admin_password?: string
}
