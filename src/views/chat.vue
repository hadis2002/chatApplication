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
              userData.status == 'available'
                ? 'text-green-500'
                : 'text-gray-300'
            "
            class="text-xs"
          >
            {{ userData.status == "available" ? "online" : "offline" }}
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
        v-if="!validMessages.length"
        class="h-full flex flex-col gap-3 justify-center items-center"
      >
        <img class="w-[50%]" src="../../public/images/empty-chat.png" alt="" />
        <p class="text-white text-lg opacity-60">گفت و گو را آغاز کنید.</p>
      </div>
      <div v-else v-for="message in validMessages" :key="message.id">
        <div
          class="flex"
          :class="{
            'justify-start': message.sender == authStore.userLoginInfo.uid,
            'justify-end': message.sender != authStore.userLoginInfo.uid,
          }"
        >
          <div
            class="flex items-start gap-2 p-3 w-fit"
            :class="{
              'flex-row': message.sender == authStore.userLoginInfo.uid,
              'flex-row-reverse': message.sender != authStore.userLoginInfo.uid,
            }"
          >
            <img
              :src="
                message.sender == authStore.userLoginInfo.uid
                  ? ''
                  : userData.avatar || defaultProfile
              "
              class="w-10 h-10 rounded-full"
              :class="
                message.sender == authStore.userLoginInfo.uid ? 'hidden' : ''
              "
            />
            <div
              class="p-3 rounded-lg max-w-xs"
              :class="{
                'bg-blue-500 text-white':
                  message.sender == authStore.userLoginInfo.uid,
                'bg-purple-500 text-white':
                  message.sender != authStore.userLoginInfo.uid,
              }"
            >
              <p>{{ message?.data.text }}</p>
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
      <div class="bg-pink-300 flex items-center left-4 right-4 absolute">
        <div>
          <div ref="containerRef"></div>
        </div>
        <p>{{ currentTime }}</p>
        <button v-if="showAudioRecordButton" @click="startAudioRecordHandler">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V8Z"
              stroke="#1C274C"
              stroke-width="1.5"
            />
            <path
              d="M13 8L17 8"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M13 11L17 11"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M20 10V11C20 15.4183 16.4183 19 12 19C7.58172 19 4 15.4183 4 11V10"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M12 19V22"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <div v-else>
          <button @click="pauseRecording">
            {{ isPauseResume ? "pause" : "resume" }}
          </button>
          <button @click="stopHandler">Stop</button>
        </div>
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

import { useWaveSurferRecorder } from "@meersagor/wavesurfer-vue";
const showAudioRecordButton = ref<boolean>(true);
const containerRef = ref<HTMLDivElement | null>(null);

const route = useRoute();
const authStore = useAuthStore();
const chatContainer = ref(null);
let messages = ref([]);
const userData = ref([]);
const messageForm = ref({
  sender: authStore.userLoginInfo.uid,
  receiverId: "",
  receiverType: "",
  data: {
    text: "",
  },
});

const fetch_user_data = () => {
  axiosConfig
    .get(`users/${messageForm.value.receiverId}`)
    .then((res) => {
      userData.value = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const validMessages = computed(() => {
  return messages.value.filter((message) => message.data && message.data.text);
});

const fetch_user_conversation = async () => {
  try {
    const res = await axiosConfig.get(
      `conversations/${route.params.conversationId}`
    );
    const arrUID = res.data.data[0].conversationId.split("_user_");
    messageForm.value.receiverId =
      arrUID[0] == authStore.userLoginInfo.uid ? arrUID[1] : arrUID[0];
    messages.value = res.data.data;
  } catch (err) {}
};

const fetch_messages = () => {
  axiosConfig
    .get(`users/${messageForm.value.receiverId}/messages`)
    .then((res) => {
      messages.value = res.data.data.filter((message) => {
        return message.conversationId == route.params.conversationId;
      });
      console.log(messages.value, "all messages");
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    })
    .catch((error) => {
      console.log(error);
    });
};

const append_message = () => {
  let receiverId = messageForm.value.receiverId;
  let messageText = messageForm.value.data.text;
  let receiverType = CometChat.RECEIVER_TYPE.USER;
  const textMessage = new CometChat.TextMessage(
    receiverId,
    messageText,
    receiverType
  );
  CometChat.sendMessage(textMessage).then(
    (textMessage) => {
      textMessage.sender = authStore.userLoginInfo.uid;
      console.log("message sent successfully", textMessage.receiver);
      messages.value.push(textMessage);
      setTimeout(() => {
        scrollToBottom();
      }, 200);
      messageForm.value.data.text = "";
      // stopTyping()
    },
    (error) => {
      console.error("Message sending failed", error);
    }
  );
};

const fetch_message_listener = () => {
  let listenerID = "UNIQUE_LISTENER_ID";
  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: (textMessage) => {
        console.log("New message received:", textMessage);
        messages.value.push(textMessage);
        setTimeout(() => {
          scrollToBottom();
        }, 50);
      },
    })
  );
};

// const is_typing_user = () => {
//   let receiverId = messageForm.value.receiverId;
//   let receiverType = CometChat.RECEIVER_TYPE.USER;
//   let typingNotification = new CometChat.TypingIndicator(
//     receiverId,
//     receiverType
//   );
//   CometChat.startTyping(typingNotification);
//   let listenerId = "is_typing_listener";
//   CometChat.addMessageListener(
//     listenerId,
//     new CometChat.MessageListener({
//       onTypingStarted: (typingIndicator) => {
//         typingIndicator.sender = authStore.userLoginInfo.uid
//         typingIndicator.receiverId = messageForm.value.receiverId
//         console.log("Typing started :", typingIndicator , receiverId);
//         // if (typingIndicator.receiverId === receiverId) {
//         // }
//       },
//       onTypingEnded: (typingIndicator) => {
//         console.log("Typing ended :", typingIndicator);
//         // if (typingIndicator.receiverId === receiverId) {
//         // }
//       },
//     })
//   );
// };

// const stopTyping = () => {
//   let receiverId = messageForm.value.receiverId;
//   let receiverType = CometChat.RECEIVER_TYPE.USER;
//   let typingNotification = new CometChat.TypingIndicator(
//     receiverId,
//     receiverType
//   );
//   CometChat.endTyping(typingNotification);
// };

// const send_message = (newMessage) => {
//   axiosConfig
//     .post("/messages", newMessage)
//     .then((res) => {
//       messages.value.push(res.data.data);
//       // scrollToBottom();
//       console.log(res.data.data, "message sent");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

const scrollToBottom = () => {
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
};

const options = computed(() => ({
  height: 48,
  waveColor: "#66667D",
  progressColor: "#6A24FF",
  barGap: 5,
  barWidth: 5,
  barRadius: 8,
  cursorWidth: 0,
  url: "https://revews-bucket.s3.ap-southeast-1.amazonaws.com/a06mmMU3sgnzuUkH4OiHvyuUgCFdLSnJaDLBao7y.webm",
}));

const {
  pauseRecording,
  startRecording,
  stopRecording,
  currentTime,
  isPauseResume,
} = useWaveSurferRecorder({
  containerRef,
  options: options.value,
  recordPluginOptions: {
    continuousWaveform: true,
  },
});

const startAudioRecordHandler = () => {
  startRecording();
  showAudioRecordButton.value = false;
};

const stopHandler = async () => {
  const blob = await stopRecording();
  console.log("blob =====", blob);
  showAudioRecordButton.value = true;
};

onMounted(async () => {
  await fetch_user_conversation();
  fetch_user_data();
  fetch_message_listener();
  fetch_messages();
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
