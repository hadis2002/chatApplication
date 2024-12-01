<template>
    <div @click="go_user_chat_page(user)" v-for="user in usersList" class="text-white px-10 p-3 flex items-center gap-4 hover:bg-blue-950 focus:bg-blue-950">
        <div class="w-16 h-12 relative">
            <div class="w-3 h-3 absolute bottom-0 right-0 rounded-full border-2 border-white" :class="user.status === 'offline' ? 'bg-gray-500' : 'bg-green-500'"></div>
            <img :src="user.avatar ? user.avatar : defaultProfile" class="w-full h-full rounded-full" alt="">
        </div>
        <div class="flex flex-col w-full">
            <div class="flex justify-between items-center">
            <div class="font-semibold text-[16px]">{{ user.name }}</div>
            <div class="text-gray-300 text-xs" :class='user.lastActiveAt ? "block" : "hidden"'>{{ new Date(user.lastActiveAt * 1000).toLocaleTimeString('fa') }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref , onMounted , defineProps } from 'vue';
import { useRouter } from 'vue-router';
import axiosConfig from '../../src/axiosConfig'
import defaultProfile from '../../public/images/default-avatar.avif'
const router = useRouter()
let usersList = ref([])
const props = defineProps({
    users: {
        type: Array,
        default: []
    }
})
const fetch_users = () => {
    axiosConfig.get('users?perPage=100&page=1')
    .then((res) => {
        usersList.value = res.data.data
        props.users.push(usersList.value)
    })
    .catch((error) => {
        console.log(error, 'error');
    });
}
const go_user_chat_page = (user) => {
    router.push({ name: 'chat', params: { userId: user.uid } });
}
onMounted(() => {
  fetch_users()
})
</script>