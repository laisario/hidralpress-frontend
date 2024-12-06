import { useQuery } from '@tanstack/react-query';
import axios from '../api';

const fetchImages = async (step, os) => {
  if (step && os) {

    const { data } = await axios.get('/images', {
      params: { step, os, },
    });
    return data;
  }
};

const useImages = ({ step, os }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['images', step, os],
    queryFn: () => fetchImages(step.toUpperCase(), os)
  });

  return ({
    images: data,
    isError,
    isLoading,
  })
};

export default useImages;
