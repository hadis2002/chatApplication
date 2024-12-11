<template>
    <div dir="rtl" class="h-dvh flex flex-col gap-10 bg-gray-900 text-white">
        <div class="flex items-center justify-between p-8">
            <div>پروفایل من</div>
            <div @click="go_back">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M19 12H5m7-7l-7 7 7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        <div class="flex flex-col  items-center justify-center">
            <div class="relative cursor-pointer rounded-full">
                <img class="rounded-full w-32 h-32" :src="loginUserInfo.avatar || defaultProfileImg" @error="(event) => event.target.src = defaultProfileImg" alt="">
                <div class="absolute flex justify-center items-center w-6 h-6 shadow bottom-2 right-1 bg-white rounded-full">
                    <svg class="w-full h-5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
                        <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"></path>
                    </svg>
                </div>
                <div class="absolute opacity-0 flex justify-center items-center w-6 h-6 shadow bottom-2 right-1 bg-white rounded-full">
                    <input @change="upload_image" type="file" class=" h-full w-full
                    file:w-full file:h-full
                    "/>
                </div>
            </div>
            <div class="text-center text-green-400 mt-2">{{ loginUserInfo.status }}</div>
            <div class="flex flex-col gap-5 mt-6">
                <div class="flex flex-col gap-2">
                    <label>نام :</label>
                    <input v-model="loginUserInfo.name" type="text" class="bg-transparent border rounded px-3 py-1">
                </div>
                <div class="flex flex-col gap-2">
                    <label>سمت :</label>
                    <input v-model="loginUserInfo.role" type="text" class="bg-transparent border rounded px-3 py-1">
                </div>
                <div class="text-center bg-purple-950 border border-gray-400 mt-3 rounded text-white py-1.5">
                    <button @click="updateUserDetails">ذخیره اطلاعات</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { CometChat } from '@cometchat-pro/chat';
import defaultProfileImg from '../../public/images/default-avatar.avif'
const authStore = useAuthStore()
const router = useRouter()
const loginUserInfo = ref({
    avatar: '',
    name: '',
    role: '',
})

const fetch_profile_data = () => {
    CometChat.getUser(authStore.userLoginInfo.uid)
    .then(
        user => {
            console.log(user);
            loginUserInfo.value = user
        }
    )
    .catch((error) => {
        console.log(error);
    })
}

const upload_image = (e) => {
    let file = e.target.files[0]
    loginUserInfo.value.avatar = file;
}

const updateUserDetails = () => {
    const user = new CometChat.User(authStore.userLoginInfo.uid);
    user.setName(loginUserInfo.value.name);
    user.setAvatar(loginUserInfo.value.avatar);
    CometChat.updateCurrentUserDetails(user)
    .then(updatedUser => {
        console.log('user updated successfully:', updatedUser);
        loginUserInfo.value = updatedUser
        authStore.setLoginInfo(updatedUser)
        const updatedUserInfo = {
        ...authStore.userLoginInfo,
      };
      localStorage.setItem('userLoginInfo', JSON.stringify(updatedUserInfo));
    })
    .catch(error => {
        console.log('can not update user:', error);
    });
};

const go_back = () => {
    router.back()
}

onMounted(() => {
    fetch_profile_data()
})
</script>

<style>

</style>