import React, { useState } from 'react';
import './Modal.css';
import { motion, AnimatePresence } from 'framer-motion';
import GetAllAccount from '../query/GetAllAccount';
import GetAllCategories from '../query/GetAllCategories';
import IncomeTransaction from '../query/IncomeTransaction';
import OutcomeTransaction from '../query/OutcomeTransaction';
import CardSlider from '../calendar/CardSlider';
import { GetAllAccountData, GetAllCategoriesData } from '../../lib/api/types';

const modalBackground = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const style = {
  background: '#333333',
  color: 'white',
};

interface Props {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewModal = ({ closeModal }: Props) => {
  //data 담아놓을 cache
  const [getAllAccountData, setGetAllAccountData] = useState<
    GetAllAccountData[]
  >([]);
  const [getAllCategoriesData, setGetAllCategoriesData] = useState<
    GetAllCategoriesData[]
  >([]);

  //변수 지정
  const [incomeSelect, setIncomeSelect] = useState(true);
  const [outcomeSelect, setOutcomeSelect] = useState(false);
  const utcDate = new Date().getTime();
  const [date, setDate] = useState(
    new Date(utcDate + 9 * 60 * 60 * 1000).toISOString().slice(0, 10),
  );
  const [incomeCategoryList, setIncomeCategoryList] = useState<string[]>([]);
  const [outcomeCategoryList, setOutcomeCategoryList] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [accountList, setAccountList] = useState<string[]>([]);
  const [account, setAccount] = useState('');
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');

  const [accountId, setAccountId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [sendIncome, setSendIncome] = useState(false);
  const [sendOutcome, setSendOutcome] = useState(false);

  const incomeCategory = () => {
    setIncomeSelect(true);
    setOutcomeSelect(false);
    setCategory('');
    setCategoryList(incomeCategoryList);
  };

  const outcomeCategory = () => {
    setIncomeSelect(false);
    setOutcomeSelect(true);
    setCategory('');
    setCategoryList(outcomeCategoryList);
  };

  const validateForm = () => {
    if (!category) {
      alert("Please check 'Category'.");
      return false;
    }
    if (!label) {
      alert("Please check 'Label'.");
      return false;
    }
    if (!amount) {
      const numberPatt = /[1-9]/g;
      if (!numberPatt.test(amount)) alert('Amount should be number.');
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!validateForm()) {
      return;
    }

    //accountId 구하기
    getAllAccountData.map((el) => {
      if (el.name === account) {
        setAccountId(el.id);
      }
    });

    if (incomeSelect) {
      setSendIncome(true);
      console.log('sendIncome', sendIncome);
    } else {
      setSendOutcome(true);
      console.log('sendOutcome', sendOutcome);
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="modalBackground"
        variants={modalBackground}
        initial="hidden"
        animate="visible"
      >
        <GetAllAccount
          setAccountList={setAccountList}
          setGetAllAccountData={setGetAllAccountData}
        />

        <GetAllCategories
          setIncomeCategoryList={setIncomeCategoryList}
          setOutcomeCategoryList={setOutcomeCategoryList}
          setCategoryList={setCategoryList}
          setGetAllCategoriesData={setGetAllCategoriesData}
        />

        <div className="modalContainer">
          <div className="header">
            <div className="title">
              <h2>Add</h2>
            </div>
            <div className="titleCloseBtn">
              <button onClick={() => closeModal(false)}>X</button>
            </div>
          </div>
          <div className="body">
            <div className="type_indicator">
              <button
                style={incomeSelect ? style : undefined}
                className="income"
                onClick={incomeCategory}
              >
                Income
              </button>
              <button
                style={outcomeSelect ? style : undefined}
                className="expenditure"
                onClick={outcomeCategory}
              >
                Expenditure
              </button>
            </div>
            <div className="date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></input>
            </div>
            <div className="category">
              {categoryList.map((el) => {
                return (
                  <button
                    style={category === el ? style : undefined}
                    onClick={() => setCategory(el)}
                  >
                    {el}
                  </button>
                );
              })}
            </div>
            <div className="cardType">
              <CardSlider
                accountList={accountList}
                account={account}
                accountId={accountId}
                setAccount={setAccount}
              />
            </div>
            <input
              className="input"
              type="text"
              placeholder="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="footer">
            <button onClick={onSubmit} id="addBtn">
              Save
            </button>
            {sendIncome ? (
              <IncomeTransaction
                accountId={accountId}
                amount={amount}
                categoryName={category}
                label={label}
                date={date}
                setSendIncome={setSendIncome}
                closeModal={closeModal}
              />
            ) : null}
            {sendOutcome ? (
              <OutcomeTransaction
                accountId={accountId}
                amount={amount}
                categoryId={categoryId}
                label={label}
                date={date}
                setSendOutcome={setSendOutcome}
                closeModal={closeModal}
              />
            ) : null}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewModal;
