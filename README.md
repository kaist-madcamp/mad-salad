# 가계부/금융 앱

사용자의 소비 내역을 시각화, 직관화해주는 가계부/금융 어플리케이션.

## 팀원

김경하, 정이든, 박종회

***

# Web(Client)

### Home

### Auth Validation

##### Sign up

- 이메일과 비밀번호로 회원가입 가능.
- 이메일과 비밀번호 validation check 구현.

##### Login

### History

- 사용자의 거래 내역을 월별로 모두 모아 보여줌.
- 지출과 수입 유형을 구분하여 따로 모아 볼 수 있음.
- 거래 내역을 추가할 수 있음.

<img src="https://user-images.githubusercontent.com/40633713/128043882-f664e3e4-6c76-4869-8438-8dab33fda57a.gif" width="750" height="450"/>


### Calendar

- 사용자의 거래 내역을 날짜별로 분류하여 달력에 나타내줌.
- 월별 총 지출 및 수입 금액 확인 가능.
- 수입은 파란색으로, 지출은 빨간색으로 설정하여 유형을 분류함. 
- 각 거래 내역을 클릭하면 상세내역(날짜, 카테고리, 지불 유형, 제목, 금액) 확인 및 수정 가능.
- 지불 방법 선택시 선택된 카드에 floating 애니메이션 적용
- Add History 버튼을 통해 거래 내역을 추가할 수 있음.

<img src="https://user-images.githubusercontent.com/40633713/128048392-ea26eba8-5b9c-4bc3-912c-a599d4518c4e.gif" width="750" height="450"/>
<img src="https://user-images.githubusercontent.com/40633713/128048461-cf4f6db7-4082-4134-bf20-1b2d4f4c745d.gif" width="750" height="450"/>

### Analytics

- By Categoreis: 사용자의 소비를 파이 그래프와 막대 그래프를 이용해, 카테고리로 나눠 비교 분석함.
- By Dates: 사용자의 소비를 꺽은선 그래프를 이용해, 날짜별로 비교 분석함.
 
<img src="https://user-images.githubusercontent.com/40633713/128047271-cfba9832-abea-4848-aba1-5383f0751277.gif" width="750" height="450"/>
<img src="https://user-images.githubusercontent.com/40633713/128047412-c7699a10-3240-4042-9bf8-152231d5927d.gif" width="750" height="450"/>


### Payment Management

- 사용자의 계좌(거래 수단)을 관리함.
- 계좌를 추가하고 제거할 수 있음.
- 사용자가 관리한 계좌를 거래 추가/수정 시 사용할 수 있음.
- 다른 계좌로 송금 가능
- 송금 카테고리, 송금 계좌, 받는 계좌 번호, 송금 내역, 금액을 입력하면 송금됨
- 최대 송금 금액은 보내는 계좌의 잔액에 따라 결정됨
- 송금 날짜는 당일만 가능
- 받는 user에게 송금 transaction이 pending 되어 있다가 
 해당 user에게 pending 되어있는 transaction이 들어오면 송금을 받겠냐는 alert dialog가 뜨게됨.
- 수락을 누르면 transaction commit, 거절을 누르면 rollback

<img src="https://user-images.githubusercontent.com/40633713/128050711-f9aff210-b402-4bb4-afea-dd3e42dd023d.gif" width="750" height="450"/>
<img src="https://user-images.githubusercontent.com/40633713/128050776-4cd9e4d0-9181-4be0-983e-03240af9b44c.gif" width="750" height="450"/>


***
# Server

## Tech
* Nodejs
* TypeScript
* Express
* Prisma(ORM)

## DB schema
Mysql database schema

## REST API 

[Auth](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/routes/auth.ts#L2)

- [x] [Login (jwt)](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/AuthController.ts#L11)
- [x] [Change password](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/AuthController.ts#L68)


[User](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/routes/user.ts#L1)

- [x] [Join (Sign up)](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/UserController.ts#L22 )
- [x] [Unroll](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/UserController.ts#L88)

[Account](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/routes/acct.ts#L1)

- [x] [Create Account](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/AccountController.ts#L10)
- [x] [Delete Account](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/AccountController.ts#L49)
- [x] [Get All Accounts](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/AccountController.ts#L92)  

[Transaction](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/routes/transaction.ts#L1)

- [x] [Income](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/TransactionController.ts#L13)
- [x] [Expenditure](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/TransactionController.ts#L124) 
- [x] [Send](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/TransactionController.ts#L240) 
- [x] [Update transaciton](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/TransactionController.ts#L423)
- [x] [Delete Ttransaction](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/TransactionController.ts#L512) 
- [x] [Show history by month](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/TransactionController.ts#L545)
- [x] [Show history by month grouped by history](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/TransactionController.ts#L604)  
- [x] [Show history by month grouped by created date](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/TransactionController.ts#L676)
- [x] [Get pending Transactions which are in the state right before sending and receiving money](https://github.com/kaist-madcamp/mad-salad/blob/ef365b370ed164f784bc36fce5d99d9b68cfce16/server/src/controllers/TransactionController.ts#L874)  

[Category](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/routes/category.ts#L1)

- [x] [Get all categories](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/CategoryController.ts#L9)
- [x] [Get all expenditure categories](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/CategoryController.ts#L32)
- [x] [Get all income categories](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/CategoryController.ts#L58)  
