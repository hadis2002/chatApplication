import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('user', {
  state: () => ({
    loginInfo: useLocalStorage('loginInfo',  {
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
      this.loginInfo = user;
    },
    removeLoginInfo() {
      this.loginInfo = null;
    }
  },
  getters: {
    getLoginInfo: (state) => state.loginInfo,
  },
});
