<template>
    <div dir="rtl" class="h-screen bg-gray-900 flex flex-col justify-center items-center">
        <div class="relative h-[25%] bg-purple-900 w-full clip-wave">
        </div>
        <div class="login-box pb-24 w-[70%] h-[75%] flex gap-14 flex-col justify-center items-center">
            <div class="text-white text-xl">ورود به چت</div>
            <div class="flex flex-col gap-8">
                <div class="relative flex items-center">
                    <div class="w-5 h-5 absolute start-3">
                        <svg viewBox="0 -65 477.988 477" xmlns="http://www.w3.org/2000/svg"><path d="m427.988281.492188h-377.988281c-27.601562.035156-49.96875 22.402343-50 50v246.601562c.03125 27.601562 22.398438 49.96875 50 50h377.988281c27.601563-.03125 49.96875-22.398438 50-50v-246.601562c-.03125-27.597657-22.398437-49.96875-50-50zm-88.898437 173.234374 118.898437-93.320312v208.738281zm-289.089844-153.234374h377.988281c16.558594.019531 29.980469 13.441406 30 30v4.492187l-192.410156 151.019531c-14.476563 11.300782-34.789063 11.28125-49.246094-.042968l-196.332031-151.015626v-4.453124c.019531-16.558594 13.4375-29.980469 30-30zm92.4375 153.863281-122.4375 115.195312v-209.371093zm285.550781 152.738281h-377.988281c-10.414062-.003906-20.078125-5.410156-25.539062-14.28125l134.035156-126.097656 45.582031 35.058594c21.691406 16.945312 52.132813 16.9375 73.816406-.019532l45.320313-35.558594 130.363281 126.539063c-5.449219 8.914063-15.140625 14.351563-25.589844 14.359375zm0 0" fill="#A9A9A9">
                            </path>
                        </svg>
                    </div>
                    <input v-model="UID" class="bg-transparent text-white ps-12 border-b border-gray-400 p-3 placeholder:text-sm" type="text" placeholder="نام کاربری خود را وارد کنید.">
                </div>
                <div class="relative flex items-center">
                    <div class="w-5 h-5 absolute start-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.314 28.323" fill="#A9A9A9" xml:space="preserve"><path d="m27.728 20.384-4.242-4.242a1.982 1.982 0 0 0-1.413-.586h-.002c-.534 0-1.036.209-1.413.586L17.83 18.97l-8.485-8.485 2.828-2.828c.78-.78.78-2.05-.001-2.83L7.929.585A1.986 1.986 0 0 0 6.516 0h-.001C5.98 0 5.478.209 5.101.587L.858 4.83C.729 4.958-.389 6.168.142 8.827c.626 3.129 3.246 7.019 7.787 11.56 6.499 6.499 10.598 7.937 12.953 7.937 1.63 0 2.426-.689 2.604-.867l4.242-4.242c.378-.378.587-.881.586-1.416 0-.534-.208-1.037-.586-1.415zm-5.656 5.658c-.028.028-3.409 2.249-12.729-7.07C-.178 9.452 2.276 6.243 2.272 6.244L6.515 2l4.243 4.244-3.535 3.535a.999.999 0 0 0 0 1.414l9.899 9.899a.999.999 0 0 0 1.414 0l3.535-3.536 4.243 4.244-4.242 4.242z"/></svg>
                    </div>
                    <input v-model="authKey" class="bg-transparent text-white ps-12 border-b border-gray-400 p-3 placeholder:text-sm" type="text" placeholder="شناسه خود را وارد کنید.">
                </div>
            </div>
            <div class="w-full flex flex-col gap-3 justify-center items-center">
                <button @click="submit_form" class="bg-purple-600 pb-3 pt-2 rounded-md w-[70%] text-white">ورود</button>
                <button class="border border-purple-600 pb-3 pt-2 rounded-md w-[70%] text-purple-600">عضویت</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CometChat } from '@cometchat-pro/chat';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
const router = useRouter()
const authStore = useAuthStore()
var UID = ref('')
var authKey = ref('')

const submit_form = () => {
    CometChat.getLoggedinUser().then(
    (user) => {
        console.log(user);
        if (!user) {
        CometChat.login(UID.value, authKey.value).then( 
            (user) => {
                console.log("Login Successful:", { user });
                authStore.setLoginInfo(user)
                localStorage.setItem('loginInfo', JSON.stringify(user));
                router.push({name: 'home'})
            },
            (error) => {
                console.log("Login failed with exception:", { error });
            }
        );
        }
    },
    (error) => {
        console.log("Something went wrong", error);
    }
);
}
</script>

<style>
  @font-face {
       font-family: BYekan ;
       src: url("../../public/font/Yekan.ttf");
     }
     body{
       font-family: BYekan;
     }
     .clip-wave {
    clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
  }
</style>