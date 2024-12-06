import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../api';
import { useState } from 'react';

const fetchImages = async (step, os) => {
  if (step && os) {

    const { data } = await axios.get('/images', {
      params: { step, os, },
    });
    return data;
  }
};

const useImages = ({ step, os }) => {
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['images', step, os],
    queryFn: () => fetchImages(step.toUpperCase(), os)
  });

  const deleteImg = async (imgId) => {
    const response = await axios.delete(`images/${imgId}`);
    return response.data;
  }

  const { mutate: deleteImage, isLoading: isDeleting} = useMutation({
    mutationFn: deleteImg,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
    onError: (error) => {
      setError('Erro ao deletar a foto. Tente novamente e se persistir, entre em contato com o Administrador.');
    },
  });

  return ({
    images: data,
    isError,
    isLoading,
    error,
    deleteImage,
    isDeleting,
  })
};

export default useImages;
