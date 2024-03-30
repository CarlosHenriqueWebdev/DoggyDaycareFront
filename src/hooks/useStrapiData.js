import { useQuery } from '@apollo/client';
import client from '../../lib/apolloClient';

const useStrapiData = (query) => {
  const { loading, error, data } = useQuery(query, { client });

  return { loading, error, data };
};

export default useStrapiData;
