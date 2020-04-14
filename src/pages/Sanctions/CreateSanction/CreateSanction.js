// @flow
import React, { useState } from 'react';
import { Row, Form, Button } from 'antd';
import type { Moment } from 'moment';

import { API_DATE_FORMAT } from '@Utils/date';
import { DateInput, SelectUsers, SelectRules, ExtraInfoInputs, type ComparisonResult } from './components';

import STYLES from './createSanction.less';

type DataProps = {
  team: Team,
  users: User[],
};

type OtherProps = {
  saveSanctions: (CreateSanction[]) => void,
};

type CreateSanctionProps = DataProps & OtherProps;

export const USERS_COMPARED_TO_RULES: { [key: any]: ComparisonResult } = {
  MORE: 'MORE',
  LESS: 'LESS',
  SAME: 'SAME',
};

export const SanctionForm = ({ team, users, saveSanctions }: CreateSanctionProps) => {
  const [selectedUsers, setSelectedUsers] = useState<Uuid[]>([]);
  const [selectedRules, setSelectedRules] = useState<Uuid[]>([]);
  const [sanctionsDate, setSanctionsDate] = useState<?Moment>(undefined);
  const [state, setState] = useState<[User, Rule, CreateSanction][]>([]);
  const [creatingSanctions, setCreatingSanctions] = useState<boolean>(false);

  const resetForm = () => {
    setSelectedUsers([]);
    setSelectedRules([]);
    setSanctionsDate(undefined);
    setState([]);
  };

  const getUser = (id: Uuid): ?User => {
    return users.find((user) => user.id === id);
  };

  const getRule = (id: Uuid): ?Rule => {
    return team.rules.find((rule) => rule.id === id);
  };

  const getSanctions = (): CreateSanction[] => {
    return state.map(([, , sanction]) => sanction);
  };

  const getSanction = (user_id: Uuid, rule_id: Uuid): ?CreateSanction => {
    const result = state.find(([user, rule]) => user_id === user.id && rule_id === rule.id);

    return result ? result[2] : undefined;
  };

  const getUsersComparedToRules = (): ComparisonResult => {
    if (selectedUsers.length > selectedRules.length) {
      return USERS_COMPARED_TO_RULES.MORE;
    }

    if (selectedUsers.length < selectedRules.length) {
      return USERS_COMPARED_TO_RULES.LESS;
    }

    return USERS_COMPARED_TO_RULES.SAME;
  };

  const initializeExtraInfo = (rule: Rule): ExtraInfo => {
    switch (rule.kind.type) {
      case 'MULTIPLICATION':
      case 'TIME_MULTIPLICATION':
        return { type: 'MULTIPLICATION', factor: 1 };

      default:
        return { type: 'NONE' };
    }
  };

  const initializeSanction = (user: User, rule: Rule): CreateSanction => {
    return {
      user_id: user.id,
      sanction_info: {
        associated_rule: rule.id,
        extra_info: initializeExtraInfo(rule),
      },
      created_at: sanctionsDate ? sanctionsDate.format(API_DATE_FORMAT) : undefined,
    };
  };

  const updateState = (usersIdSelected: Uuid[], rulesIdSelected: Uuid[]) => {
    const newState: [User, Rule, CreateSanction][] = [];
    const nbUsersSelected = usersIdSelected.length;
    const nbRulesSelected = rulesIdSelected.length;

    for (var i = 0; i < Math.max(nbUsersSelected, nbRulesSelected); i++) {
      let user;
      let rule;

      // Multiple Users
      if (nbUsersSelected > nbRulesSelected && nbRulesSelected > 0) {
        user = getUser(usersIdSelected[i]);
        rule = getRule(rulesIdSelected[0]);
      }
      // Multiple Rules
      else if (nbUsersSelected < nbRulesSelected && nbUsersSelected > 0) {
        user = getUser(usersIdSelected[0]);
        rule = getRule(rulesIdSelected[i]);
      }
      // Each is single
      else if (nbUsersSelected > 0 && nbRulesSelected > 0) {
        user = getUser(usersIdSelected[0]);
        rule = getRule(rulesIdSelected[0]);
      }

      if (user && rule) {
        const sanction = getSanction(user.id, rule.id) || initializeSanction(user, rule);
        newState.push([user, rule, sanction]);
      }
    }

    setState(newState);
  };

  const updateSelectedUsers = (value: Uuid[]) => {
    setSelectedUsers(value);
    // To Refactor
    updateState(value, selectedRules);
  };

  const updateSelectedRules = (value: Uuid[]) => {
    setSelectedRules(value);
    // To Refactor
    updateState(selectedUsers, value);
  };

  const updateSanction = (index: number, extraInfo: ExtraInfo) => {
    let stateCopy = [...state];
    stateCopy[index][2].sanction_info.extra_info = extraInfo;

    setState(stateCopy);
  };

  const updateSanctionsDate = (date: ?Moment) => {
    let stateCopy = [...state];
    stateCopy.forEach((element) => (element[2].created_at = date ? date.format(API_DATE_FORMAT) : date));

    setState(stateCopy);
    setSanctionsDate(date);
  };

  const onSave = async () => {
    setCreatingSanctions(true);

    const sanctions = getSanctions();
    const isSuccess = await saveSanctions(sanctions);

    if (isSuccess) {
      resetForm();
    }

    setCreatingSanctions(false);
  };

  const buttonIsDisabled: boolean = state.length === 0;

  return (
    <Form colon={false}>
      <SelectUsers
        users={users}
        selectedUsers={selectedUsers}
        updateSelectedUsers={updateSelectedUsers}
        isMultiple={selectedRules.length <= 1}
      />
      <SelectRules
        rules={team.rules}
        selectedRules={selectedRules}
        updateSelectedRules={updateSelectedRules}
        isMultiple={selectedUsers.length <= 1}
      />
      <ExtraInfoInputs
        formState={state}
        updateSanction={updateSanction}
        usersComparedToRules={getUsersComparedToRules()}
      />
      <DateInput date={sanctionsDate} updateDate={updateSanctionsDate} />
      <Row type='flex' justify='center'>
        <Button
          type='primary'
          onClick={onSave}
          disabled={buttonIsDisabled}
          loading={creatingSanctions}
          className={STYLES.saveButton}
        >
          {creatingSanctions ? '' : 'Ça paye !'}
        </Button>
      </Row>
    </Form>
  );
};

export default SanctionForm;
