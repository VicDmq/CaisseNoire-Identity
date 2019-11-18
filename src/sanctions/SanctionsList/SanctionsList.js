// @flow
import React, { useState } from 'react'
import { List, Modal, message } from 'antd'

import withConnect, { type Reason } from '@Components/utils/Connect'
import { SanctionListItem, type ListItemProps } from './SanctionListItem'

import STYLES from './styles.less'

type DataProps = {
  team: Team,
  users: User[],
  sanctions: Sanction[]
}

type OtherProps = {
  deleteSanction: (Uuid, () => void, () => void) => void,
  isAdmin: boolean
}

type SanctionListProps = DataProps & OtherProps

export const SanctionsList = ({ team, users, sanctions, deleteSanction, isAdmin }: SanctionListProps) => {
  const showDeleteConfirm = (sanction_id: Uuid) => {
    const modal = Modal.confirm({})

    modal.update({
      centered: true,
      maskClosable: true,
      title: 'Supprimer une sanction',
      content: 'Êtes vous sur de vouloir supprimer cette sanction ?',
      okText: 'Oui',
      cancelText: 'Non',
      okType: 'danger',
      onOk () {
        return new Promise(function (resolve, reject) {
          deleteSanction(sanction_id, () => resolve(), () => reject())
        })
          .then(() => {
            message.success('Sanction supprimée')
          })
          .catch(() => {
            message.error('Impossible de supprimer cette sanction')
          })
          .finally(() => {
            modal.destroy()
          })
      }
    })
  }

  const getDataSource = (): ListItemProps[] => {
    let props: ListItemProps[] = []

    sanctions
      .sort((item1, item2) => {
        return new Date(item2.created_at) - new Date(item1.created_at)
      })
      .forEach(sanction => {
        const user = users.find(user => user.id === sanction.user_id)

        if (user) {
          props.push({
            rule: team.rules.find(rule => rule.id === sanction.sanction_info.associated_rule),
            user,
            sanction,
            showDeleteConfirm,
            isAdmin
          })
        }
      })

    return props
  }

  return (
    <List dataSource={getDataSource()} renderItem={props => <SanctionListItem {...props} />} className={STYLES.list} />
  )
}

export default withConnect<DataProps, OtherProps>(SanctionsList)
