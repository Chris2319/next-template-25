'use client';

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import { auth } from '@/libs/config/firebase.ts';
import {QueryKey} from "@/libs/enums/queryKeys.ts";

type LogoutResult = void;

export const useLogOut = (): UseMutationResult<LogoutResult, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation<LogoutResult, Error, void>({
    mutationFn: async () => {
      if (!auth) {
        throw new Error('Firebase Auth is not initialized');
      }
      await signOut(auth);
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: [QueryKey.auth] });
      } catch (error) {
        console.error('Failed to invalidate auth query on logout', error);
      }
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });
};

export default useLogOut;


