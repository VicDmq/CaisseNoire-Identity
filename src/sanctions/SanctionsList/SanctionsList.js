// @flow
import React from 'react'
import { List } from 'antd'

import withConnect from '@Components/utils/Connect'
import { SanctionListItem, type ListItemProps } from './SanctionListItem'

import STYLES from './styles.less'

type DataProps = {
  team: Team,
  users: User[],
  sanctions: Sanction[]
}

const SanctionsList = ({ team, users, sanctions }: DataProps) => {
  const getDataSource = (): ListItemProps[] => {
    let props: ListItemProps[] = []

    sanctions.forEach(sanction => {
      const user = users.find(user => user.id === sanction.user_id)

      if (user) {
        props.push({
          rule: team.rules.find(rule => rule.id === sanction.sanction_info.associated_rule),
          user: user,
          sanction
        })
      }
    })

    return props
  }

  return (
    <List dataSource={getDataSource()} renderItem={props => <SanctionListItem {...props} />} className={STYLES.list} />
  )
}

export default withConnect<DataProps, {}>(SanctionsList)
