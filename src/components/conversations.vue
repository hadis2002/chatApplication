<template>
  <div
    @click="go_chat_page(conversation)"
    class="text-white p-3 flex items-center gap-4 hover:bg-blue-950 focus:bg-blue-950"
  >
    <div class="w-16 h-12 relative">
      <div
        class="w-3 h-3 absolute bottom-0 right-0 rounded-full border-2 border-white"
        :class="conversation.conversationWith.status === 'offline' ? 'bg-gray-500' : 'bg-green-500'"
      ></div>
      <img
        :src="conversation.avatar ? conversation.avatar : defaultProfile"
        class="w-full h-full rounded-full"
        alt=""
      />
    </div>
    <div class="flex flex-col w-full">
      <div class="flex justify-between items-center">
        <div class="font-semibold text-[16px]">{{ findedUser.name }}</div>
        <div
          class="text-gray-300 text-xs"
          :class="conversation.lastActiveAt ? 'block' : 'hidden'"
        >
          {{ new Date(conversation.lastActiveAt * 1000).toLocaleTimeString("en") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import defaultProfile from "../../public/images/default-avatar.avif";
const router = useRouter();
const findedUser = ref(null)
const props = defineProps({
  conversation: {
    type: Object,
    default: {},
  }, 
  users: {
    type: Array,
    default: [],
  }
});
const go_chat_page = (conversation) => {
  router.push({ name: "chat", params: { conversationId: conversation.uid } });
};
onMounted(()=>{
  const uid = props.conversation.conversationWith.split('_user')[0]
  findedUser.value = props.users.find(item=>item.uid == uid)
})
</script>
