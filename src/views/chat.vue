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
        <div @click="start_call">
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
      <div
        v-else
        v-for="message in messages"
        :key="message.id"
        class="text-white"
      >
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
              v-if="message.type == 'text'"
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
            <div v-if="message.type == 'audio'" class="flex items-center gap-2">
              <audio :src="message.data.url" controls></audio>
              <!-- <div style="max-width: 250px"> {{ message.data.url }}
                <Vue3WaveAudioPlayer
                  :wave_width="250"
                  :wave_height="40"
                  :wave_options='{"samples":50}' 
                  :src="message.data.url"
                  :load_audio_onmount="true"
                  />  
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#21242b] flex items-center justify-between px-5 h-[10%]">
      <div
        v-if="!showAudioRecordButton"
        class="flex items-center gap-2 w-[90%]"
      >
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

      <!-- record  -->
      <div
        :class="showAudioRecordButton ? '' : 'hidden'"
        class="w-[90%] flex gap-2 items-center"
      >
        <div class="w-[80%]">
          <div ref="containerRef"></div>
        </div>
        <p class="w-[20%] text-gray-300">{{ currentTime }}</p>
      </div>
      <div class="w-[10%] flex justify-center">
        <svg
          id="microphone"
          @touchstart="startAudioRecordHandler"
          @touchend="stopHandler"
          class="w-6 h-6"
          fill="gray"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="800px"
          height="800px"
          viewBox="0 0 47.964 47.965"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M23.982,35.268c5.531,0,10.033-4.635,10.033-10.332V10.333C34.015,4.635,29.513,0,23.982,0
                c-5.532,0-10.032,4.635-10.032,10.333v14.604C13.951,30.633,18.451,35.268,23.982,35.268z M29.22,24.938
                c0,2.974-2.35,5.395-5.238,5.395s-5.238-2.42-5.238-5.395V10.333c0-2.974,2.35-5.395,5.238-5.395s5.238,2.42,5.238,5.395V24.938z"
              />
              <path
                d="M40.125,29.994c0-1.361-1.222-2.469-2.72-2.469c-1.5,0-2.721,1.107-2.721,2.469c0,4.042-3.621,7.329-8.074,7.329h-5.257
                c-4.453,0-8.074-3.287-8.074-7.329c0-1.361-1.221-2.469-2.721-2.469c-1.499,0-2.719,1.107-2.719,2.469
                c0,6.736,6.014,12.221,13.424,12.266v0.766h-5.944c-1.499,0-2.72,1.107-2.72,2.47s1.221,2.47,2.72,2.47h17.325
                c1.5,0,2.721-1.107,2.721-2.47s-1.221-2.47-2.721-2.47h-5.942V42.26C34.111,42.215,40.125,36.73,40.125,29.994z"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWaveSurferRecorder } from "@meersagor/wavesurfer-vue";
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
// let userId = route.params.conversationId.split("_")[0];

const messageForm = ref({
  sender: authStore.userLoginInfo.uid,
  receiverId: "",
  receiverType: "",
  data: {
    text: "",
  },
});

const showAudioRecordButton = ref<boolean>(false);
const containerRef = ref<HTMLDivElement | null>(null);
const options = () =>
  computed(() => ({
    height: 48,
    waveColor: "#fff",
    progressColor: "#6A24FF",
    barGap: 5,
    barWidth: 5,
    barRadius: 8,
    cursorWidth: 0,
    duration: 80,
    // url: audioUrl, // مقدار URL صوتی
  }));

const { startRecording, stopRecording, currentTime } = useWaveSurferRecorder({
  containerRef,
  options: options.value,
  recordPluginOptions: {
    continuousWaveform: true,
  },
});

const isRecording = ref(false);
const audioBlob = ref<Blob | null>(null);

const startAudioRecordHandler = async () => {
  if (isRecording.value) return;
  showAudioRecordButton.value = true;
  isRecording.value = true;
  await startRecording();
};

const stopHandler = async () => {
  if (!isRecording.value) return;
  showAudioRecordButton.value = false;
  isRecording.value = false;
  audioBlob.value = await stopRecording();
  append_message();
};

const append_message = () => {
  let receiverId = messageForm.value.receiverId;
  let receiverType = CometChat.RECEIVER_TYPE.USER;
  let messageText = messageForm.value.data.text;
  const textMessage = new CometChat.TextMessage(
    receiverId,
    messageText,
    receiverType
  );
  CometChat.sendMessage(textMessage).then(
    (sentTextMessage) => {
      sentTextMessage.sender = authStore.userLoginInfo.uid;
      console.log("Text message sent successfully", sentTextMessage);
      messages.value.push(sentTextMessage);
      setTimeout(() => {
        scrollToBottom();
      }, 200);
      messageForm.value.data.text = "";
    },
    (error) => {
      console.error("Text message sending failed", error);
    }
  );

  if (audioBlob.value) {
    const mediaFile = new File([audioBlob.value], "audio.webm", {
      type: "audio/webm",
    });
    const mediaMessage = new CometChat.MediaMessage(
      receiverId,
      mediaFile,
      CometChat.MESSAGE_TYPE.AUDIO,
      receiverType
    );
    CometChat.sendMessage(mediaMessage).then(
      (sentMediaMessage) => {
        sentMediaMessage.sender = authStore.userLoginInfo.uid;
        console.log("Media message sent successfully", sentMediaMessage);
        messages.value.push(sentMediaMessage);
        setTimeout(() => {
          scrollToBottom();
        }, 200);
      },
      (error) => {
        console.log("Media message sending failed with error", error);
      }
    );
  }
};

const fetch_user_data = () => {
  // if (userId == authStore.userLoginInfo.uid) {
  //   userId = route.params.conversationId.split("_")[2]
  // }
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
        }, 200);
      },
      onMediaMessageReceived: (mediaMessage) => {
        console.log("Media message received successfully", mediaMessage);
        messages.value.push(mediaMessage);
        setTimeout(() => {
          scrollToBottom();
        }, 200);
      },
    })
  );
};

const start_call = () => {
  const receiverID = messageForm.value.receiverId;
  const callType = CometChat.CALL_TYPE.AUDIO;
  // const sessionID = "SESSION_ID"; // اگر می‌خواهید تماس‌های گروهی ایجاد کنید
  const call = new CometChat.Call(receiverID, callType);
  CometChat.initiateCall(call).then(
    (call) => {
      console.log("Call started successfully:", call);
    },
    (error) => {
      console.log("Failed to start call:", error);
    }
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

document.addEventListener("DOMContentLoaded", function () {
  const microphoneIcon = document.getElementById("microphone");

  microphoneIcon.addEventListener("touchstart", () => {
    microphoneIcon.classList.add("touched");
    microphoneIcon.classList.add("recording");
    startAudioRecordHandler();
  });

  microphoneIcon.addEventListener("touchend", () => {
    microphoneIcon.classList.remove("recording");
    setTimeout(() => {
      microphoneIcon.classList.remove("touched");
    }, 300);
  });
});

const scrollToBottom = () => {
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
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
#microphone {
  transition: transform 0.3s ease, fill 0.3s ease;
}
#microphone.touched {
  transform: scale(1.2);
  fill: white;
  background-color: rgb(65, 104, 177);
  border-radius: 100%;
  padding: 7px;
}
@keyframes recordingAnimation {
  0% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1.3);
  }
}

.recording {
  animation: recordingAnimation 1s infinite;
}
main h1 {
  display: none;
}
main {
  background-color: rgb(120, 58, 197);
}
</style>
