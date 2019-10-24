declare type Team = {
  id: string,
  name: string,
  rules: Rule[],
}

declare type Rule = {
  id: string,
  name: string,
  description: string,
  category: 'TRAINING_DAY' | 'GAME_DAY',
  kind: BasicKind | MultiplicationKind,
}

declare type BasicKind = {
  type: 'BASIC',
  price: number,
}

declare type MultiplicationKind = {
  type: 'MULTIPLICATION',
  price_to_multiply: number,
}

declare type TimeMultiplicationKind = {
  type: 'TIME_MULTIPLICATION',
  price_per_time_unit: number,
  time_unit: TimeUnit,
}

declare type RegularIntervalsKind = {
  type: 'REGULAR_INTERVALS',
  price: number,
  interval_in_time_unit: number,
  time_unit: TimeUnit,
}

declare type TimeUnit =
  | 'SECOND'
  | 'MINUTE'
  | 'HOUR'
  | 'DAY'
  | 'WEEK'
  | 'MONTH'
  | 'YEAR'

declare type User = {
  id: string,
  team_id: string,
  lastname: string,
  firstname: string,
  nickname: ?string,
  email: ?string,
}
