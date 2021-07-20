# 금융 앱

사용자의 소비 내역을 시각화, 직관화해주는 금융 어플리케이션.

## 팀원

김경하, 정이든, 박종회


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

[Category](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/routes/category.ts#L1)

- [x] [Get all categories](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/CategoryController.ts#L9)
- [x] [Get all expenditure categories](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/CategoryController.ts#L32)
- [x] [Get all income categories](https://github.com/kaist-madcamp/Week3-finance-app/blob/5f0409d62bb17e4452f7b96178cfa9bd7d5f9dc6/server/src/controllers/CategoryController.ts#L58)  
