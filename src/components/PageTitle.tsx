import { Helmet } from 'react-helmet';

export interface Props {
  title: string;
}

export default function PageTitle({ title }: Props) {
  return (
    <Helmet>
      <title> {title} | Instaclone </title>
    </Helmet>
  );
}
