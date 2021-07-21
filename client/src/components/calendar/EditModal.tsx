import React, { useState, useEffect } from 'react';
import '../UI/Modal.css';
import { motion, AnimatePresence } from 'framer-motion';
import CardSlider from './CardSlider';
import GetAllAccount from '../query/GetAllAccount';
import UpdateOne from '../query/UpdateOne';
import DeleteOne from '../query/DeleteOne';
import { ClickedDataType } from './CalendarGrid';
import { GetAllAccountData, GetAllCategoriesData } from '../../lib/api/types';
import GetAllCategories from '../query/GetAllCategories';

const modalBackground = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const style = {
  background: '#333333',
  color: 'white',
};

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  monthData: any[];
  clickedData?: ClickedDataType;
}

const EditModal = ({ setOpenModal, monthData, clickedData }: Props) => {
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
  const [sendEdit, setSendEdit] = useState(false);
  const [sendDelete, setSendDelete] = useState(false);

  useEffect(() => {
    monthData.map((el) => {
      if (el.id === clickedData?.index) {
        //income or expenditure 설정
        if (el.type === 'INCOME') {
          incomeCategory();
        } else {
          outcomeCategory();
        }

        //date 설정
        setDate(el.createdAt.slice(0, 10));

        //category 설정
        getAllCategoriesData?.map((element) => {
          if (el.categoryId === element.id) {
            setCategory(element.name);
            setCategoryId(el.categoryId);
          }
        });

        //account 설정
        getAllAccountData?.map((element, idx) => {
          if (el.accountId === element.id) {
            setAccount(element.name);
            setAccountId(idx);
          }
        });

        //label, amount 설정
        setLabel(el.content);
        setAmount(el.amount);
      }
    });
  }, [
    clickedData,
    incomeCategoryList,
    outcomeCategoryList,
    getAllCategoriesData,
    getAllAccountData,
  ]);

  console.log(accountId);

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

  const onSubmitAdd = () => {
    if (!validateForm()) {
      return;
    }

    //accountId 구하기
    getAllAccountData.map((el) => {
      if (el.name === account) {
        setAccountId(el.id);
      }
    });

    setSendEdit(true);
  };

  if (!clickedData) return null;

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
              <h2>Edit</h2>
            </div>
            <div className="titleCloseBtn">
              <button onClick={() => setOpenModal(false)}>X</button>
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
              {categoryList.map((el, idx) => {
                return (
                  <button
                    key={idx}
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
            <button onClick={() => setSendDelete(true)} id="cancelBtn">
              Remove
            </button>
            <button onClick={onSubmitAdd}>Save</button>
            {sendEdit ? (
              <UpdateOne
                clickedData={clickedData}
                label={label}
                amount={amount}
                categoryName={category}
                date={date}
                accountId={accountId}
                setSendEdit={setSendEdit}
                setOpenModal={setOpenModal}
              />
            ) : null}
            {sendDelete ? (
              <DeleteOne
                clickedData={clickedData}
                setSendDelete={setSendDelete}
                setOpenModal={setOpenModal}
              />
            ) : null}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditModal;
