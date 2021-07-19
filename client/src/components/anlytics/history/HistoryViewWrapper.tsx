import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Modal from '../UI/Modal';
import HistoryCardContainer from './HistoryCardContainer';
import HistoryColumn from './HistoryColumn';
import HistoryRow from './HistoryRow';
import HistoryCategoryContainer from './HistoryCategoryContainer';
import {
  DefaultHistoryData,
  FetchHistoryByCreatedAtData,
  GetAllAccountData,
  GetAllCategoriesData,
} from '../../../lib/api/types';
import { SumIndicatorType } from '../../../pages/HistoryView';
import { getAllAccount } from '../../../lib/api/account';
import { getAllCategories } from '../../../lib/api/category';

interface Props {
  historyDataByCreatedAt: FetchHistoryByCreatedAtData[][];
  selectedSumIndicator: SumIndicatorType;
}

export default function HistoryViewWrapper({
  historyDataByCreatedAt,
  selectedSumIndicator,
}: Props) {
  const [historyFormClicked, setHistoryFormClicked] = useState(false);
  const [pickedType, setPickedType] = useState<'expenditure' | 'income'>(
    'expenditure',
  );
  const [pickedDate, setPickedDate] = useState(new Date().toLocaleDateString());
  const [pickedCategory, setPickedCategory] = useState(() => {
    if (pickedType === 'expenditure') return '식비';
    else return '용돈';
  });
  const [pickedCard, setPickedCard] = useState('');
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (pickedType === 'income') setPickedCategory('월급');
    else setPickedCategory('식비');
  }, [pickedType]);

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
      console.log(defaultHistoryData)
    }
  };

  const categoryClickHandler = (category: string) => {
    setPickedCategory(category);
  };

  const cardClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setPickedCard(e.currentTarget.className.split(' ')[2]);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numberPatt = /[1-9]/g;
    // Input Validation
    if (!numberPatt.test(amount)) alert('금액은 숫자로 적어주세요.');
    if (pickedCard === '') alert('지출한 카드를 선택해주세요.');

    // HTTP request to Server.
    console.log(
      pickedType,
      pickedDate,
      pickedCategory,
      pickedCard,
      label,
      amount,
    );
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
            return (
              <HistoryRow
                key={row.id}
                onClicked={() =>
                  toggleShowModal({
                    transactionId: row.id,
                    accountId: row.accountId,
                    accountName: row.account.name,
                    amount: row.amount,
                    categoryId: row.categoryId,
                    createdAt: row.createdAt,
                    type: row.type,
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
      <Modal isClose={!historyFormClicked} onClose={toggleShowModal}>
        <HistoryForm onSubmit={submitHandler}>
          <IconWrapper>
            <CloseIcon />
          </IconWrapper>

          <TypePicker>
            <TypeIndicator
              className="income"
              selected={pickedType === 'income'}
              onClick={() => setPickedType('income')}
            >
              Income
            </TypeIndicator>
            <TypeIndicator
              className="expenditure"
              selected={pickedType === 'expenditure'}
              onClick={() => setPickedType('expenditure')}
            >
              Expenditure
            </TypeIndicator>
          </TypePicker>

          <DatePicker>{pickedDate}</DatePicker>

          <CategoryPicker>
            <HistoryCategoryContainer
              pickedCategory={pickedCategory}
              pickedType={pickedType}
              onClicked={categoryClickHandler}
              allCategoryData={categoryData!}
            />
          </CategoryPicker>

          <CardPicker>
            <HistoryCardContainer
              onClicked={cardClickHandler}
              pickedCard={pickedCard}
              allCardData={accountData!}
            />
          </CardPicker>

          <InputWrapper>
            <ContentInput
              value={label}
              onChange={(e) => setLabel(e.currentTarget.value)}
              placeholder="Label"
            />
            <ContentInput
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
              placeholder="Amount"
            />
          </InputWrapper>

          <SubmitButtonWrapper>
            <SubmitButton
              disabled={!label || !amount}
              type="submit"
              value="Done"
            />
          </SubmitButtonWrapper>
        </HistoryForm>
      </Modal>
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
  margin-bottom: 75px;
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
  color: #f0f0f0;
  background-color: #333;
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
  &:disabled {
    opacity: 0.5;
  }
`;
