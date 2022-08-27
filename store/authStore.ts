import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_URL } from '../utils';
import { IUser } from '../types';

interface BearState {
  userProfile: any;
  allUsers: IUser[];
  addUser: (by: any) => void;
  removeUser: () => void;
  fetchAllUsers: () => void;
}

const useAuthStore = create<BearState>()(
  devtools(
    persist(
      set => ({
        userProfile: null,
        allUsers: [],
        addUser: user => set({ userProfile: user }),
        removeUser: () => set({ userProfile: null }),
        fetchAllUsers: async () => {
          const response = await axios.get(`${BASE_URL}/api/users`);

          set({ allUsers: response.data });
        },
      }),
      {
        name: 'auth',
      }
    )
  )
);

export default useAuthStore;
