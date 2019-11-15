// @flow
import React, { useState } from 'react'
import { Icon, Button } from 'antd'
import classNames from 'classnames/bind'

import STYLES from './styles.less'

export type ListItemProps = {
  rule: ?Rule,
  user: User,
  sanction: Sanction
}

const cx = classNames.bind(STYLES)

export const SanctionListItem = (props: ListItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const deleteSanction = () => {
    // Modal TODO
    console.log(props.sanction.id)
  }

  return (
    <div className={STYLES.listItemContainer}>
      <div className={STYLES.listItem}>
        <Icon
          className={STYLES.expandIcon}
          theme='filled'
          type={isExpanded ? 'down-circle' : 'right-circle'}
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <div className={STYLES.infoContainer}>
          <div className={STYLES.playerInfo}>
            {props.user.nickname ? props.user.nickname : `${props.user.firstname} ${props.user.lastname}`}
          </div>
          {props.rule ? (
            <div className={STYLES.ruleInfo}>{props.rule.name}</div>
          ) : (
            <div className={STYLES.missingRule}>Cette règle a été supprimée</div>
          )}
        </div>
        <div className={STYLES.tagAndButtonContainer} onClick={deleteSanction}>
          <span className={STYLES.priceTag}>{props.sanction.price} €</span>
          <Button className={STYLES.deleteButton} type='danger'>
            <Icon theme='filled' type='delete' />
          </Button>
        </div>
      </div>
      <div className={cx({ default: true, collapsible: isExpanded, collapsed: !isExpanded })}>
        <div>aaaaaaaaaaaaaaaaa</div>Hey
      </div>
    </div>
  )
}
