// @flow

export const DEFAULT_RULE: Rule = {
  id: 'rule_id',
  name: 'Rule',
  description: 'This is a description',
  category: 'TRAINING_DAY',
  kind: {
    type: 'BASIC',
    price: 2.0
  }
}

export const DEFAULT_TEAM: Team = {
  id: 'team_id',
  name: 'Dream Team',
  rules: [DEFAULT_RULE]
}

export const DEFAULT_USER: User = {
  id: 'user_id',
  team_id: 'team_id',
  lastname: 'Snow',
  firstname: 'John',
  nickname: 'King Of the North',
  email: null
}

export const DEFAULT_SANCTION: Sanction = {
  id: 'id',
  team_id: 'team_id',
  user_id: 'user_id',
  sanction_info: {
    associated_rule: 'rule_id',
    extra_info: {
      type: 'NONE'
    }
  },
  price: 2.0,
  created_at: '2019-10-28'
}

export const DEFAULT_NOT_FOUND: ApiError = {
  kind: 'NOT_FOUND',
  description: 'Not found'
}
