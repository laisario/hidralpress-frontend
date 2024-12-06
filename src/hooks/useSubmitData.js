import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const useSubmitData = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (data) => {
    const response = await axios.post('/os/', data);
    return response.data;
  }

  const { mutate } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      setError('Erro ao enviar a foto. Tente novamente e se persistir, entre em contato com o Administrador.');
    },
  });

  const handleSubmit = (data) => {
    setLoading(true);
    setError(null);

    try {
      mutate(data);
    } catch (err) {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    error,
  };
};

export default useSubmitData;
