import cors from 'cors'

var corsOptions = {
    origin: 'http://143.248.194.30:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  export default cors(corsOptions)