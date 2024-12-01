<template>
    <div dir="rtl" class="bg-[#2e333d] h-screen w-full">
        <div class="h-[10%] w-full flex items-center justify-between px-7 bg-[#21242b]">
            <div class="flex items-center gap-7">
                <div>
                    <svg class="rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" width="24" height="24">
                        <circle cx="5" cy="12" r="2"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                        <circle cx="19" cy="12" r="2"></circle>
                    </svg>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" width="24" height="24">
                        <path d="M6.62 10.79a15.093 15.093 0 006.59 6.59l2.2-2.2a1 1 0 01.91-.27c1.02.24 2.1.37 3.19.37a1 1 0 011 1v3.03a1 1 0 01-1 1C10.07 21.5 2.5 13.93 2.5 4a1 1 0 011-1H6.53a1 1 0 011 1c0 1.09.13 2.17.37 3.19a1 1 0 01-.27.91l-2.2 2.2z" />
                    </svg>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" width="24" height="24">
                        <path d="M17 10.5V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z"/>
                    </svg>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="flex flex-col items-center">
                    <div class="text-gray-400">{{ userData.name }}</div>
                    <div :class="userData.status == 'online' ? 'text-green-500' : 'text-gray-300'" class="text-xs">{{ userData.status }}</div>
                </div>
                <div>
                    <img class="rounded-full w-10 h-10" :src="userData.avatar ? userData.avatar : defaultProfile" alt="">
                </div>
            </div>
        </div>
        <div class="h-[80%] overflow-auto">
            <div v-for="message in messages" :key="message.id">
                <div
                    class="flex items-start gap-2 p-3"
                    :class="{'justify-end': message.senderId === currentUserId, 'justify-start': message.senderId !== currentUserId}"
                >
                    <img v-if="message.senderId !== currentUserId" src="../../public/images/default-avatar.avif" class="w-10 h-10 rounded-full">
                    <div
                        class="p-3 rounded-lg max-w-xs"
                        :class="{
                            'bg-blue-500 text-white': message.senderId === currentUserId,
                            'bg-gray-200': message.senderId !== currentUserId
                        }"
                    >
                        <!-- <p>{{ message.content }}</p> -->
                        سلام خوبی
                    </div>
                    <img v-if="message.senderId === currentUserId" src="../../public/images/default-avatar.avif" class="w-10 h-10 rounded-full">
                </div>
            </div>
        </div>
        <div class="bg-[#21242b] flex items-center justify-between px-5 h-[10%]">
            <div class="flex items-center gap-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" width="24" height="24">
                        <path d="M17.5 6.5L11 13c-1.17 1.17-1.17 3.07 0 4.24 1.17 1.17 3.07 1.17 4.24 0l6.5-6.5c1.76-1.76 1.76-4.62 0-6.38-1.76-1.76-4.62-1.76-6.38 0L6.34 10.62c-2.34 2.34-2.34 6.14 0 8.48 2.34 2.34 6.14 2.34 8.48 0l5.31-5.31a1 1 0 0 0-1.42-1.42l-5.31 5.31c-1.56 1.56-4.1 1.56-5.66 0s-1.56-4.1 0-5.66l6.12-6.12c1.17-1.17 3.07-1.17 4.24 0 1.17 1.17 1.17 3.07 0 4.24l-6.5 6.5a1 1 0 1 0 1.42 1.42l6.5-6.5c1.56-1.56 1.56-4.1 0-5.66-1.56-1.56-4.1-1.56-5.66 0L7.76 12.76a1 1 0 1 0 1.42 1.42l5.31-5.31c1.17-1.17 3.07-1.17 4.24 0 .93.93.93 2.44 0 3.37l-6.5 6.5c-.63.63-1.67.63-2.3 0s-.63-1.67 0-2.3l6.5-6.5a1 1 0 0 0-1.42-1.42z"/>
                    </svg>
                </div>
                <div>
                    <input type="text" class="bg-transparent placeholder:text-gray-400" placeholder="پیام خود را بنویسید.">
                </div>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" width="24" height="24">
                    <path d="M12 3a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V7a4 4 0 0 0-4-4zm2 9a2 2 0 0 1-4 0V7a2 2 0 0 1 4 0v5z"/>
                    <path d="M19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7H3c0 4.42 3.58 8 8 8s8-3.58 8-8h-2z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axiosConfig from '../../src/axiosConfig'
import defaultProfile from '../../public/images/default-avatar.avif'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
let messages = ref([])
const userData = ref([])
const fetch_user_data = () => {
    axiosConfig.get(`users/${route.params.userId}`)
    .then((res) => {
        userData.value = res.data.data
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    })
}
const fetch_user_messages = () => {
    axiosConfig.get(`users/${route.params.userId}/messages?myMentionsOnly=false&hasReactions=false&mentionsWithBlockedInfo=false&mentionswithTagInfo=false&perPage=100`)
    .then((res) => {
        messages.value = res.data.content
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    });
}

onMounted(() => {
    fetch_user_data()
    fetch_user_messages()
})
</script>