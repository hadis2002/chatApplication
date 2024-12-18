<template>
  <div
    dir="rtl"
    class="h-screen bg-gray-900 flex flex-col justify-center items-center"
  >
    <div class="relative h-[25%] bg-purple-900 w-full clip-wave"></div>
    <div
      class="login-box pb-24 w-[70%] h-[75%] flex gap-14 flex-col justify-center items-center"
    >
      <div class="text-white text-xl">ورود به چت</div>
      <div class="flex flex-col gap-8">
        <div class="relative flex items-center">
          <div class="w-5 h-5 absolute start-3">
            <svg viewBox="0 -65 477.988 477" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m427.988281.492188h-377.988281c-27.601562.035156-49.96875 22.402343-50 50v246.601562c.03125 27.601562 22.398438 49.96875 50 50h377.988281c27.601563-.03125 49.96875-22.398438 50-50v-246.601562c-.03125-27.597657-22.398437-49.96875-50-50zm-88.898437 173.234374 118.898437-93.320312v208.738281zm-289.089844-153.234374h377.988281c16.558594.019531 29.980469 13.441406 30 30v4.492187l-192.410156 151.019531c-14.476563 11.300782-34.789063 11.28125-49.246094-.042968l-196.332031-151.015626v-4.453124c.019531-16.558594 13.4375-29.980469 30-30zm92.4375 153.863281-122.4375 115.195312v-209.371093zm285.550781 152.738281h-377.988281c-10.414062-.003906-20.078125-5.410156-25.539062-14.28125l134.035156-126.097656 45.582031 35.058594c21.691406 16.945312 52.132813 16.9375 73.816406-.019532l45.320313-35.558594 130.363281 126.539063c-5.449219 8.914063-15.140625 14.351563-25.589844 14.359375zm0 0"
                fill="#A9A9A9"
              ></path>
            </svg>
          </div>
          <input
            v-model="UID"
            class="bg-transparent text-white ps-12 border-b border-gray-400 p-3 placeholder:text-sm"
            type="text"
            placeholder="نام کاربری خود را وارد کنید."
          />
        </div>
      </div>
      <div class="w-full flex flex-col gap-3 justify-center items-center">
        <button
          @click="submit_form"
          class="bg-purple-600 pb-3 pt-2 rounded-md w-[70%] text-white"
        >
          ورود
        </button>
        <button
          class="border border-purple-600 pb-3 pt-2 rounded-md w-[70%] text-purple-600"
        >
          عضویت
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { CometChat } from "@cometchat-pro/chat";
import { useRouter } from "vue-router";
import axiosConfig from "../../src/axiosConfig";
import { useAuthStore } from "../stores/authStore";
const router = useRouter();
const authStore = useAuthStore();

let UID = ref("");

const submit_form = () => {
  axiosConfig
    .post(`users/${UID.value}/auth_tokens`)
    .then((res) => {
      const loginData = res.data.data;
      console.log("Login Successful:", loginData);
      authStore.setLoginInfo(loginData);
      localStorage.setItem("userLoginInfo", JSON.stringify(loginData));
      router.push({ name: "home" });
    })
    .catch((error) => {
      console.error("Login failed:", error);
    });
};
</script>

<style>
@font-face {
  font-family: Poppins;
  src: url("../../public/font/Poppins-Light.ttf");
}
body {
  font-family: 'Poppins';
}
.clip-wave {
  clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
}
</style>
