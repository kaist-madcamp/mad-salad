// import React, { SetStateAction } from 'react';
// import axios from 'axios';
// import { useQuery } from 'react-query';
// import Axios from '../../lib/defaultClient';
// import { GetPendingData } from '../../lib/api/types';

// //db에서 userAccountList 가져오기

// interface Props {
//   setIsPending: React.Dispatch<SetStateAction<boolean>>;
//   setPendingData: React.Dispatch<SetStateAction<GetPendingData | undefined>>;
// }

// const GetPending = ({ setIsPending, setPendingData }: Props) => {
//   const { data } = useQuery<GetPendingData>('GetPending', async () => {
//     const response = await Axios.get('/transaction/getPending');
//     return response.data.data;
//   });

//   if (data) {
//     setIsPending(true);
//   }
//   setPendingData(data!);

//   return <div></div>;
// };

// export default GetPending;

export default {};
