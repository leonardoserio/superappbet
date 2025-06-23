import { useState, useCallback } from 'react';
import { AsyncState, LoadingState } from '@/types';

export const useAsyncState = <T>(initialData: T | null = null): [
  AsyncState<T>,
  {
    execute: (asyncFunction: () => Promise<T>) => Promise<void>;
    reset: () => void;
    setData: (data: T | null) => void;
    setError: (error: string | null) => void;
    setLoading: (loading: LoadingState) => void;
  }
] => {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: 'idle',
    error: null,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState(prev => ({ ...prev, loading: 'loading', error: null }));
    
    try {
      const result = await asyncFunction();
      setState({
        data: result,
        loading: 'success',
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: 'error',
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: 'idle',
      error: null,
    });
  }, [initialData]);

  const setData = useCallback((data: T | null) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setLoading = useCallback((loading: LoadingState) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  return [
    state,
    {
      execute,
      reset,
      setData,
      setError,
      setLoading,
    },
  ];
};