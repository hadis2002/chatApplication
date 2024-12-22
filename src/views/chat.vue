<template>
  <div dir="rtl" class="bg-[#2e333d] h-dvh w-full">
    <div
      class="h-[10%] w-full flex items-center justify-between px-7 bg-[#21242b]"
    >
        <div class="flex items-center gap-7">
          <div>
            <svg
              class="rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gray"
              width="24"
              height="24"
            >
              <circle cx="5" cy="12" r="2"></circle>
              <circle cx="12" cy="12" r="2"></circle>
              <circle cx="19" cy="12" r="2"></circle>
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gray"
              width="24"
              height="24"
            >
              <path
                d="M6.62 10.79a15.093 15.093 0 006.59 6.59l2.2-2.2a1 1 0 01.91-.27c1.02.24 2.1.37 3.19.37a1 1 0 011 1v3.03a1 1 0 01-1 1C10.07 21.5 2.5 13.93 2.5 4a1 1 0 011-1H6.53a1 1 0 011 1c0 1.09.13 2.17.37 3.19a1 1 0 01-.27.91l-2.2 2.2z"
              />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gray"
              width="24"
              height="24"
            >
              <path
                d="M17 10.5V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z"
              />
            </svg>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex flex-col items-center">
            <div class="text-gray-400">{{ userData.name }}</div>
            <div
              :class="
                userData.status == 'online' ? 'text-green-500' : 'text-gray-300'
              "
              class="text-xs"
            >
              {{ userData.status }}
            </div>
          </div>
          <div>
            <img
              class="rounded-full w-10 h-10"
              :src="userData.avatar ? userData.avatar : defaultProfile"
              alt=""
            />
          </div>
        </div>
    </div>
    <div ref="chatContainer" class="h-[80%] scroll-smooth overflow-auto">
      <div
        v-if="validMessages.length === 0"
        class="h-full flex flex-col gap-3 justify-center items-center"
      >
        <img class="w-[50%]" src="../../public/images/empty-chat.png" alt="" />
        <p class="text-white text-lg opacity-60">گفت و گو را آغاز کنید.</p>
      </div>
      <div v-else v-for="message in validMessages" :key="message.id">
        <div
          class="flex"
          :class="{
            'justify-start':
              (message.sender?.uid || message.sender) ==
              authStore.userLoginInfo.uid,
            'justify-end':
              (message.sender?.uid || message.sender) !=
              authStore.userLoginInfo.uid,
          }"
        >
          <div
            class="flex items-start gap-2 p-3 w-fit"
            :class="{
              'flex-row':
                (message.sender?.uid || message.sender) ==
                authStore.userLoginInfo.uid,
              'flex-row-reverse':
                (message.sender?.uid || message.sender) !=
                authStore.userLoginInfo.uid,
            }"
          >
            <img
              :src="
                (message.sender?.uid || message.senderId) ==
                authStore.userLoginInfo.uid
                  ? ''
                  : userData.avatar || defaultProfile
              "
              class="w-10 h-10 rounded-full"
              :class="
                (message.sender?.uid || message.sender) ==
                authStore.userLoginInfo.uid
                  ? 'hidden'
                  : ''
              "
            />
            <div
              class="p-3 rounded-lg max-w-xs"
              :class="{
                'bg-blue-500 text-white':
                  (message.sender?.uid || message.sender) ==
                  authStore.userLoginInfo.uid,
                'bg-purple-500 text-white':
                  (message.sender?.uid || message.sender) !=
                  authStore.userLoginInfo.uid,
              }"
            >
              <p>{{ message.data.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#21242b] flex items-center justify-between px-5 h-[10%]">
        <div class="flex items-center gap-2">
          <div @click="append_message">
            <svg
              class="w-5 h-5"
              fill="gray"
              height="800px"
              width="800px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 495.003 495.003"
              xml:space="preserve"
            >
              <g id="XMLID_51_">
                <path
                  id="XMLID_53_"
                  d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616
                                  l-67.6-32.22V456.687z"
                />
                <path
                  id="XMLID_52_"
                  d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422
                                  c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414
                                  l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956
                                  L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
                />
              </g>
            </svg>
          </div>
          <div>
            <input
              @keydown.enter="append_message"
              v-model.trim="messageForm.data.text"
              type="text"
              class="bg-transparent placeholder:text-gray-400 outline-none text-white"
              placeholder="پیام خود را بنویسید."
            />
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="gray"
            width="24"
            height="24"
          >
            <path
              d="M12 3a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V7a4 4 0 0 0-4-4zm2 9a2 2 0 0 1-4 0V7a2 2 0 0 1 4 0v5z"
            />
            <path
              d="M19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7H3c0 4.42 3.58 8 8 8s8-3.58 8-8h-2z"
            />
          </svg>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axiosConfig from "../../src/axiosConfig";
import { CometChat } from "@cometchat-pro/chat";
import { useAuthStore } from "../stores/authStore";
import defaultProfile from "../../public/images/default-avatar.avif";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const authStore = useAuthStore();
const chatContainer = ref(null);
let messages = ref([]);
const userData = ref([]);
const messageForm = ref({
  receiver: route.params.userId,
  receiverType: "user",
  data: {
    text: '',
  },
});
const fetch_user_data = () => {
  axiosConfig
    .get(`users/${route.params.userId}`)
    .then((res) => {
      userData.value = res.data.data;
      console.log(userData, "user data");
    })
    .catch((error) => {
      console.log(error);
    });
};

const validMessages = computed(() => {
  return messages.value.filter((message) => message.data && message.data.text);
});

const fetch_user_messages = async () => {
  let allMessages = [];
  let page = 1;

  try {
    while (true) {
      const { data, meta } = await axiosConfig
        .get(`users/${route.params.userId}/messages`, {
          params: { limit: 100, page },
        })
        .then((res) => res.data);

      allMessages.push(...data);

      if (page++ >= meta.pagination.total_pages) break;
    }

    // فیلتر کردن پیام‌ها برای اطمینان از صحت گیرنده و فرستنده
    const filteredMessages = allMessages.filter(
  (msg) =>
    (msg.sender == 'app_system' && msg.receiver == route.params.userId) ||
    (msg.sender == route.params.userId && msg.receiver == 'app_system') ||
    (msg.sender == route.params.userId && msg.receiver == authStore.userLoginInfo.uid) ||
    (msg.sender == authStore.userLoginInfo.uid && msg.receiver == route.params.userId)
);

    // مرتب‌سازی پیام‌ها
    // filteredMessages.sort((a, b) => a.sentAt - b.sentAt);

    messages.value = allMessages;

    console.log("Messages fetched and filtered:", messages.value);

    setTimeout(scrollToBottom, 100); // اسکرول به پایین
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};





// const fetch_user_messages = () => {
//   axiosConfig
//     .get(`users/${route.params.userId}/messages?limit=1000`)
//     .then((res) => {
//       console.log(res.data.data);
      
// //       const currentUserId = authStore.userLoginInfo.uid;
// //       const targetUserId = route.params.userId;
// //       messages.value = res.data.data.reduce((filteredMessages, message) => {
        
// //         if (message.sender === "app_system") {
// //           message.sender = currentUserId;
// //         }
// //         if (
// //           (message.senderId === currentUserId &&
// //             message.receiverID === targetUserId) ||
// //           (message.senderId === targetUserId &&
// //             message.receiverID === currentUserId)
// //         ) {
// //           filteredMessages.push(message);
// //         }

// //         console.log(message.sender, "message.sender");
// // console.log(authStore.userLoginInfo.uid, "current user id");

// //         return filteredMessages;
// //       }, []);
//       messages.value = res.data.data
//       console.log(messages.value, "user messages");
//       setTimeout(scrollToBottom, 100);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

const append_message = () => {
  const newMessage = {
    receiver: route.params.userId,
    receiverType: messageForm.value.receiverType,
    data: {
      text: messageForm.value.data.text,
    },
    sentAt: Date.now(), // اضافه کردن زمان ارسال پیام
  };
  messages.value.push(newMessage); // افزودن پیام جدید به لیست پیام‌ها
  send_message(newMessage); // ارسال پیام به سرور
  messageForm.value.data.text = ""; // پاک کردن متن پیام پس از ارسال
};



const send_message = (newMessage) => {
  axiosConfig
    .post("/messages", newMessage)
    .then((res) => {
      messages.value.push(res.data.data); // اضافه کردن پیام به لیست پیام‌ها
      // messages.value.sort((a, b) => a.sentAt - b.sentAt); // مرتب‌سازی پیام‌ها بر اساس زمان ارسال
      scrollToBottom(); // اسکرول به پایین پس از ارسال پیام
      console.log(res.data.data, "message sent");
    })
    .catch((error) => {
      console.log(error);
    });
};


const scrollToBottom = () => {
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
};

onMounted(() => {
  fetch_user_data();
  fetch_user_messages();
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
