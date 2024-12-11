import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('user', {
  state: () => ({
    userLoginInfo: useLocalStorage('userLoginInfo',  {
        authToken: '',
        avatar: '',
        blockedByMe: '',
        deactivatedAt: '',
        hasBlockedMe: '',
        lastActiveAt: '',
        name: '',
        role: '',
        status: '',
        uid: ''
    }),
  }),
  actions: {
    setLoginInfo(user) {
      this.userLoginInfo = user;
    },
    removeLoginInfo() {
      this.userLoginInfo = null;
    }
  },
  getters: {
    getLoginInfo: (state) => state.userLoginInfo,
  },
});
