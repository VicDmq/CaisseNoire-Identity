// @flow
import React, { useState } from 'react'
import { Icon } from 'antd'

import STYLES from './styles.less'

export type ListItemProps = {
  rule: ?Rule,
  user: ?User,
  sanction: Sanction
}

export const SanctionListItem = (props: ListItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <div className={STYLES.listItem}>
      <Icon
        className={STYLES.expandIcon}
        theme='filled'
        type={isExpanded ? 'down-circle' : 'right-circle'}
        onClick={() => setIsExpanded(!isExpanded)}
      />
      {props.user && props.rule ? (
        <div className={STYLES.info}>
          {props.user.nickname ? props.user.nickname : `${props.user.firstname} ${props.user.lastname}`}
          {' - '}
          {props.rule.name}
        </div>
      ) : (
        <div className={STYLES.missingData}>{!props.user ? 'Joueur supprimé' : 'Règle supprimée'}</div>
      )}
      <span className={STYLES.price}>{props.sanction.price} €</span>
    </div>
  )
}
