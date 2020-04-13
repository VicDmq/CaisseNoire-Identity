// @flow
import React, { useState } from 'react';
import { Icon, Button } from 'antd';

import { RuleCategoryText } from '@Utils/text';
import formatCurrency from '@Utils/currency';
import formatDate from '@Utils/date';

import STYLES from './sanctionListItem.less';

export type ListItemProps = {
  rule: ?Rule,
  user: User,
  sanction: Sanction,
  showDeleteConfirm: (Uuid) => void,
  isAdmin: boolean,
};

export const SanctionListItem = (props: ListItemProps) => {
  const [isExtended, setisExtended] = useState<boolean>(false);

  return (
    <div className={STYLES.listItemContainer} test-id='sanction-list-item'>
      <div className={isExtended ? STYLES.listItemExtended : STYLES.listItem}>
        <Icon
          test-id='expand-icon'
          className={STYLES.expandIcon}
          theme='filled'
          type={isExtended ? 'down-circle' : 'right-circle'}
          onClick={() => setisExtended(!isExtended)}
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
        <div className={STYLES.tagAndButtonContainer}>
          <span className={STYLES.priceTag}>{formatCurrency(props.sanction.price)}</span>
          <Button
            className={STYLES.deleteButton}
            disabled={!props.isAdmin}
            type='danger'
            onClick={() => props.showDeleteConfirm(props.sanction.id)}
          >
            <Icon theme='filled' type='delete' />
          </Button>
        </div>
      </div>
      <div test-id='extraDescription' className={isExtended ? STYLES.extended : STYLES.collapsed}>
        <div className={STYLES.categoryAndDate}>
          {props.rule ? (
            <div className={STYLES.categoryTag}>
              <div>{RuleCategoryText[props.rule.category]}</div>
            </div>
          ) : (
            ''
          )}
          <span className={STYLES.creationDate}>Ajouté le {formatDate(props.sanction.created_at)}</span>
        </div>
        {props.rule && <div className={STYLES.ruleDescription}>{props.rule.description}</div>}
      </div>
    </div>
  );
};
