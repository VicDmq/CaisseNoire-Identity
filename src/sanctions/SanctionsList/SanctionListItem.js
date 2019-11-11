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
      {props.user ? (
        <span className={STYLES.user}>
          {props.user.nickname ? props.user.nickname : `${props.user.firstname} ${props.user.lastname}`}
        </span>
      ) : (
        <span>Joueur supprimé</span>
      )}
      {props.rule ? <span className={STYLES.rule}>{props.rule.name}</span> : <span>Règle supprimée</span>}
      <span className={STYLES.price}>{props.sanction.price} €</span>
    </div>
  )
}
