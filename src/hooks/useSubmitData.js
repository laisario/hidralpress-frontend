import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api';
import { useState } from 'react';

const useSubmitData = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const postData = async (data) => {
    const response = await axios.post('/os/', data);
    return response.data;
  }

  const { mutate } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      setLoading(false)
    },
    onError: (error) => {
      setLoading(false)
      setError('Erro ao enviar a foto. Tente novamente e se persistir, entre em contato com o Administrador.');
    },
  });

  return {
    handleSubmit: mutate,
    loading,
    setLoading,
    error,
  };
};

export default useSubmitData;
