<template>
  <div
    @click="go_user_chat_page(user)"
    class="text-white p-3 flex items-center gap-4 hover:bg-blue-950 focus:bg-blue-950"
  >
    <div class="w-16 h-12 relative">
      <div
        class="w-3 h-3 absolute bottom-0 right-0 rounded-full border-2 border-white"
        :class="user.status === 'offline' ? 'bg-gray-500' : 'bg-green-500'"
      ></div>
      <img
        :src="user.avatar ? user.avatar : defaultProfile"
        class="w-full h-full rounded-full"
        alt=""
      />
    </div>
    <div class="flex flex-col w-full">
      <div class="flex justify-between items-center">
        <div class="font-semibold text-[16px]">{{ user.name }}</div>
        <div
          class="text-gray-300 text-xs"
          :class="user.lastActiveAt ? 'block' : 'hidden'"
        >
          {{ new Date(user.lastActiveAt * 1000).toLocaleTimeString("en") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import defaultProfile from "../../public/images/default-avatar.avif";
const router = useRouter();
const props = defineProps({
  user: {
    type: Object,
    default: {},
  }
});
const go_user_chat_page = (user) => {
  router.push({ name: "chat", params: { userId: user.uid } });
};
</script>
