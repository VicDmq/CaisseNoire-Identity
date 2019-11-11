// @flow
import React from 'react'
import { List } from 'antd'

import withConnect, { type Reason } from '@Components/utils/Connect'
import { SanctionListItem, type ListItemProps } from './SanctionListItem'

import STYLES from './styles.less'

type DataProps = {
  team: Team,
  users: User[],
  sanctions: Sanction[]
}

const SanctionsList = ({ team, users, sanctions }: DataProps) => {
  const getDataSource = (): ListItemProps[] => {
    return sanctions.map(sanction => ({
      rule: team.rules.find(rule => rule.id === sanction.sanction_info.associated_rule),
      user: users.find(user => user.id === sanction.user_id),
      sanction
    }))
  }

  return (
    <List dataSource={getDataSource()} renderItem={props => <SanctionListItem {...props} />} className={STYLES.list} />
  )
}

export default withConnect<DataProps, {}>(SanctionsList)
