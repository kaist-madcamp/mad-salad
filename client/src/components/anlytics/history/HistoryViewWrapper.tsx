import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Modal from '../../UI/Modal';
import HistoryCardContainer from './HistoryCardContainer';
import HistoryColumn from './HistoryColumn';
import HistoryRow from './HistoryRow';
import HistoryCategoryContainer from './HistoryCategoryContainer';
import {
  DefaultHistoryData,
  FetchHistoryByCreatedAtData,
  FetchHistoryInput,
  GetAllAccountData,
  GetAllCategoriesData,
} from '../../../lib/api/types';
import { SumIndicatorType } from '../../../pages/HistoryView';
import { getAllAccount } from '../../../lib/api/account';
import { getAllCategories } from '../../../lib/api/category';
import { getPaymentEnKeyName } from '../../../lib/helper';
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from '../../../lib/api/transaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  historyDataByCreatedAt: FetchHistoryByCreatedAtData[][];
  selectedSumIndicator: SumIndicatorType;
  selectedDate: FetchHistoryInput;
}

type PickedDataType = {
  transactionId?: number;
  type: 'expenditure' | 'income' | 'receive' | 'send';
  categoryName: string;
  categoryId?: number;
  accountName: string;
  accountId?: number;
  label: string;
  amount: string;
};
export default function HistoryViewWrapper({
  historyDataByCreatedAt,
  selectedSumIndicator,
  selectedDate,
}: Props) {
  const [historyFormClicked, setHistoryFormClicked] = useState(false);
  const [dateKeystroke, setDateKeystroke] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
    day: 21,
  });

  const [pickedData, setPickedData] = useState<PickedDataType>({
    transactionId: undefined,
    type: 'expenditure',
    categoryName: '식비',
    categoryId: undefined,
    accountId: undefined,
    accountName: '',
    label: '',
    amount: '',
  });

  // console.log(dateKeystroke);

  useEffect(() => {
    if (pickedData.type === 'income')
      setPickedData((prev) => ({ ...prev, categoryName: '월급' }));
    else setPickedData((prev) => ({ ...prev, categoryName: '식비' }));
  }, [pickedData.type]);

  useEffect(() => {
    setDateKeystroke({
      year: selectedDate.year,
      month: selectedDate.month,
      day: 21,
    });
  }, [selectedDate]);

  const { mutateAsync: mutateUpdateAsync, isLoading: isUpdating } = useMutation(
    updateTransaction,
  );
  const { mutateAsync: mutateDeleteAsync, isLoading: isDeleting } = useMutation(
    deleteTransaction,
  );
  const { mutateAsync: mutateCreateAsync, isLoading: isCreating } = useMutation(
    createTransaction,
  );

  const { data: accountData } = useQuery<GetAllAccountData[] | undefined>(
    ['account', 'all'],
    () => getAllAccount(),
    {
      retry: 1,
    },
  );

  const { data: categoryData } = useQuery<GetAllCategoriesData[] | undefined>(
    ['category', 'all'],
    () => getAllCategories(),
    {
      retry: 1,
    },
  );

  const toggleShowModal = (defaultHistoryData?: DefaultHistoryData) => {
    if (historyFormClicked) setHistoryFormClicked(false);
    else {
      setHistoryFormClicked(true);

      if (!defaultHistoryData) return null;
      setPickedData({
        ...defaultHistoryData,
        accountName: getPaymentEnKeyName(defaultHistoryData.accountName),
      });
      const DateArray = new Date(defaultHistoryData?.date)
        .toLocaleDateString()
        .split('. ');

      setDateKeystroke({
        year: +DateArray[0],
        month: +DateArray[1],
        day: +DateArray[2],
      });
    }
  };

  const addHistoryClickHandler = () => {
    setPickedData({
      type: 'expenditure',
      categoryName: '식비',
      accountName: '',
      label: '',
      amount: '',
    });
    setHistoryFormClicked(!historyFormClicked);
  };

  const categoryClickHandler = (categoryName: string) => {
    setPickedData((prev) => ({ ...prev, categoryName }));
  };

  const cardClickHandler = (e: React.BaseSyntheticEvent) => {
    setPickedData((prev) => ({
      ...prev,
      accountName: e.target.className.split(' ')[2],
    }));
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const deleteBtnHandler = async () => {
    if (window.confirm('삭제하면 되돌릴 수 없습니다.') === false) return null;
    try {
      const { transactionId } = pickedData;
      if (!transactionId) alert('Error. There is no transactionId ');
      const { data } = await mutateDeleteAsync(transactionId!);
      if (!data.ok) alert(data.error);
      console.log('transaction delete 성공');
      setHistoryFormClicked(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numberPatt = /[1-9]/g;
    // Input Validation
    if (!numberPatt.test(pickedData.amount))
      return alert('금액은 숫자로 적어주세요.');
    if (pickedData.accountName === '')
      return alert('지출한 카드를 선택해주세요.');

    const {
      transactionId,
      label,
      amount,
      categoryName,
      type,
      accountId,
      accountName,
    } = pickedData;

    console.log(label, amount, categoryName, type, accountId, accountName);
    if (!(label && amount && categoryName && type && accountName))
      return alert('정보를 전부 입력해주세요.');

    const foundAccount = accountData?.find(
      (acc) => getPaymentEnKeyName(acc.name) === accountName,
    );

    const { year, month, day } = dateKeystroke;
    // Create transaction
    if (!transactionId) {
      try {
        const { data } = await mutateCreateAsync({
          type,
          accountId: foundAccount?.id!,
          content: label,
          amount,
          categoryName,
          date: `${year}-${month}-${day}`,
        });
        if (!data.ok) return alert(data.error);
        console.log('transaction create 성공');
        setHistoryFormClicked(false);
      } catch (error) {
        alert(error);
      }
    } else {
      // Update transaction
      try {
        const { data } = await mutateUpdateAsync({
          transactionId,
          content: label,
          amount,
          categoryName,
          type,
          createdAt: `${year}-${month}-${day}`,
          accountId: foundAccount?.id!,
        });
        if (!data.ok) return alert(data.error);
        console.log('transaction update 성공');
        setHistoryFormClicked(false);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  if (!historyDataByCreatedAt) return null;

  return (
    <Container>
      {historyDataByCreatedAt.map((rows, idx) => (
        <HistoryColumn key={idx} createdAt={rows[0].createdAt}>
          {rows.map((row) => {
            if (
              selectedSumIndicator !== row.type &&
              selectedSumIndicator !== 'DEFAULT'
            )
              return;
            const type = row.type.toLowerCase() as
              | 'income'
              | 'expenditure'
              | 'receive'
              | 'send';
            return (
              <HistoryRow
                key={row.id}
                onClicked={() =>
                  toggleShowModal({
                    transactionId: row.id,
                    type: type,
                    date: row.createdAt,
                    categoryName: row.category.name,
                    categoryId: row.category.id,
                    accountName: row.account.name,
                    accountId: row.account.id,
                    amount: row.amount + '',
                    label: row.content,
                  })
                }
                type={row.type}
                content={row.content}
                amount={row.amount}
                accountName={row.account.name}
              />
            );
          })}
        </HistoryColumn>
      ))}
      {historyFormClicked && (
        <Modal isClose={!historyFormClicked} onClose={toggleShowModal}>
          <HistoryForm onSubmit={submitHandler}>
            <IconWrapper>
              <CloseIcon />
            </IconWrapper>

            <TypePicker>
              <TypeIndicator
                className="income"
                selected={pickedData.type === 'income'}
                onClick={() =>
                  setPickedData((prev) => ({ ...prev, type: 'income' }))
                }
              >
                Income
              </TypeIndicator>
              <TypeIndicator
                className="expenditure"
                selected={pickedData.type === 'expenditure'}
                onClick={() =>
                  setPickedData((prev) => ({ ...prev, type: 'expenditure' }))
                }
              >
                Expenditure
              </TypeIndicator>
            </TypePicker>

            <DatePicker>
              <div>
                <YearInput
                  onChange={(e) =>
                    setDateKeystroke((prev) => ({
                      ...prev,
                      year: +e.target.value,
                    }))
                  }
                  maxLength={4}
                  value={dateKeystroke.year}
                />
                <MonthInput
                  onChange={(e) =>
                    setDateKeystroke((prev) => ({
                      ...prev,
                      month: +e.target.value,
                    }))
                  }
                  maxLength={2}
                  value={dateKeystroke.month}
                />
                <DayInput
                  onChange={(e) =>
                    setDateKeystroke((prev) => ({
                      ...prev,
                      day: +e.target.value,
                    }))
                  }
                  maxLength={2}
                  value={dateKeystroke.day}
                />
              </div>
            </DatePicker>

            <CategoryPicker>
              <HistoryCategoryContainer
                pickedCategory={pickedData.categoryName}
                pickedType={pickedData.type}
                onClicked={categoryClickHandler}
                allCategoryData={categoryData!}
              />
            </CategoryPicker>

            <CardPicker>
              <HistoryCardContainer
                onClicked={cardClickHandler}
                pickedCard={pickedData.accountName}
                allCardData={accountData!}
              />
            </CardPicker>

            <InputWrapper>
              <ContentInput
                value={pickedData.label}
                onChange={(e) => {
                  const keystroke = e.currentTarget?.value;
                  return setPickedData((prev) => {
                    return {
                      ...prev,
                      label: keystroke,
                    };
                  });
                }}
                placeholder="Label"
              />
              <ContentInput
                value={pickedData.amount}
                onChange={(e) => {
                  const keystroke = e.currentTarget?.value;
                  return setPickedData((prev) => {
                    return {
                      ...prev,
                      amount: keystroke,
                    };
                  });
                }}
                placeholder="Amount"
              />
            </InputWrapper>

            <SubmitButtonWrapper>
              <SubmitButton
                disabled={!pickedData.label || !pickedData.amount}
                type="submit"
                value={isUpdating ? 'Updating...' : 'Done'}
              />
              {pickedData.transactionId && (
                <SubmitButton
                  className="delete-btn"
                  type="button"
                  value={isDeleting ? 'Deleting...' : 'Delete'}
                  onClick={deleteBtnHandler}
                />
              )}
            </SubmitButtonWrapper>
          </HistoryForm>
        </Modal>
      )}

      <FloatingBlock onClick={addHistoryClickHandler}>
        <FontAwesomeIcon color={'#000'} size="2x" icon={faPlusCircle} />
        <Text>Add History</Text>
      </FloatingBlock>
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 7.5rem;
  width: calc(100% - 1.875rem);
  max-width: 36.75rem;
  margin: 5.0625rem auto 0;
`;

const HistoryForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 155px;
`;

const IconWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const CloseIcon = styled.i`
  color: #f0f0f0;
  position: relative;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  font-size: 36px;
  cursor: pointer;
`;

const TypePicker = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
  margin-top: 80px;
  padding: 0 50px;
  .income {
    margin-right: 10px;
  }
`;

const TypeIndicator = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-radius: 15px;
  padding: 0 15px;
  background-color: ${(props) =>
    props.selected
      ? props.theme.selectedBgColor
      : props.theme.unselectedBgColor};
  color: ${(props) =>
    props.selected ? props.theme.selectedColor : props.theme.unselectedColor};
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
`;

const DatePicker = styled.div`
  width: 194px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 71px;
  width: var(--width);
  height: 36px;
  font-family: inherit;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  font-feature-settings: 'tnum' on, 'lnum' on;
  color: var(--black);
`;

const CategoryPicker = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 71px;
  padding: 0 50px;
  width: 100%;
`;

const CardPicker = styled.div`
  margin-top: 58px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: 0 50px;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`;

const ContentInput = styled.input`
  background: transparent;
  color: ${(props) => props.theme.itemRowColor};
  background-color: ${(props) => props.theme.itemRowBgColor};
  border: none;
  box-sizing: border-box;
  border-radius: 15px;
  height: 69px;
  padding: 19px 38px;
  outline: none;
  margin: 15px 0;
  font-family: inherit;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  font-feature-settings: 'tnum' on, 'lnum' on;
`;

const SubmitButtonWrapper = styled.div`
  width: 100%;
  margin-top: 4.4375rem;
  padding: 0 3.125rem;
  height: 4.1875rem;
`;

const SubmitButton = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  border: none;
  background: #54aafc;
  outline: none;
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  color: white;
  cursor: pointer;
  & + & {
    margin: 30px 0;
  }
  &:disabled {
    opacity: 0.5;
  }
  &.delete-btn {
    background-color: #ee4337;
  }
`;

const FloatingBlock = styled.div`
  position: fixed;
  display: flex;
  bottom: 43px;
  left: 50%;
  transform: translateX(-50%);
  justify-content: space-between;
  align-items: center;
  align-items: center;
  width: 195px;
  height: 51px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.3);
  background: #f0f0f0;
  border-radius: 8514px;
  padding-left: 4px;
  cursor: pointer;
  svg {
    margin-left: 5px;
  }
`;

const Text = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-right: 35px;
  color: black;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  font-family: inherit;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  font-feature-settings: 'tnum' on, 'lnum' on;
  color: ${(props) => props.theme.itemRowColor};
  outline: none;
  &:focus {
    color: #ff7d1f;
  }
`;
const YearInput = styled(Input)`
  width: 85px;
`;

const MonthInput = styled(Input)`
  width: 43px;
`;

const DayInput = styled(Input)`
  width: 43px;
`;
