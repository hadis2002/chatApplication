<template>
  <div class="bg-[#111016] w-full h-dvh">

    <div dir="rtl"class="h-[15%] flex justify-between px-8 items-center">
        <div class="flex flex-row-reverse gap-4 items-center">
            <Menu as="div" class="relative inline-block text-left">
                <MenuButton
                  class="bg-[#486BE717] z-50 relative px-4 py-3 rounded-lg"
                >
                  <div aria-hidden="true" class="z-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="16" viewBox="0 0 4 16" fill="none">
                      <circle cx="2" cy="2" r="2" fill="#486BE7"/>
                      <circle cx="2" cy="8" r="2" fill="#486BE7"/>
                      <circle cx="2" cy="14" r="2" fill="#486BE7"/>
                    </svg>
                  </div>
                </MenuButton>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute top-12 -start-14 border w-[130px] text-left border-gray-600 px-4 font-semibold py-2 text-sm flex flex-col gap-3 text-white bg-[#1b1922] rounded-lg z-50"
                  >
                      <MenuItem>
                        <button class="text-left">Setting</button>
                      </MenuItem>
                      <MenuItem>
                        <button class="text-left">New Group</button>
                      </MenuItem>
                      <MenuItem>
                        <button @click="go_profile_page" class="text-left">Profile</button>
                      </MenuItem>
                      <MenuItem>
                        <button @click="logout" class="text-left">Logout</button>
                      </MenuItem>
                  </MenuItems>
                </transition>
            </Menu>
            <button class="bg-[#486BE717] relative px-3 py-3 rounded-lg">
              <input
                @keyup="searchQuery = $event.target.value"
                type="text"
                class=" absolute bg-transparent text-sm outline-none"
                placeholder=""
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <g clip-path="url(#clip0_1_360)">
                  <path d="M17.795 16.8053L13.4021 12.4126C14.494 11.0995 15.1519 9.41337 15.1519 7.57617C15.1519 3.39865 11.7533 0 7.57599 0C3.39856 0 0 3.39865 0 7.57617C0 11.7534 3.39856 15.1518 7.57599 15.1518C9.41309 15.1518 11.0993 14.494 12.4124 13.4021L16.8053 17.795C16.9419 17.9317 17.1211 18 17.3002 18C17.4792 18 17.6584 17.9317 17.7951 17.795C18.0684 17.5217 18.0684 17.0786 17.795 16.8053ZM1.39966 7.57617C1.39966 4.17043 4.17033 1.39966 7.57599 1.39966C10.9815 1.39966 13.7521 4.17043 13.7521 7.57617C13.7521 10.9816 10.9815 13.7521 7.57599 13.7521C4.17033 13.7521 1.39966 10.9816 1.39966 7.57617Z" fill="#486BE7"/>
                </g>
                <defs>
                  <clipPath id="clip0_1_360">
                    <rect width="18" height="18" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
        </div> 
        <div class="text-white font-semibold">HOME</div>
    </div>
    <div class="h-[85%] flex flex-col items-center">
      <TabGroup>
        <TabList class="flex justify-around h-[8%] w-[90%] border-b border-[#1B1620]">
          <Tab
            @click="currentTab = 'chats'"
            class="!bg-transparent text-white outline-none text-sm focus:border-b-[3px] focus:border-[#1053FF] focus:text-[#6a87ee]"
          >
             CHATS
          </Tab>
          <Tab
            @click="currentTab = 'status'"
            class="!bg-transparent text-white outline-none text-sm focus:border-b-[3px] focus:border-[#1053FF] focus:text-[#6a87ee]"
          >
            STATUS
          </Tab>
          <Tab
            @click="currentTab = 'calls'"
            class="!bg-transparent text-white outline-none text-sm focus:border-b-[3px] focus:border-[#1053FF] focus:text-[#6a87ee]"
          >
           CALLS
          </Tab>
        </TabList>

        <TabPanels class="h-[92%] w-full pt-5 overflow-auto">
          <TabPanel class="h-full overflow-auto px-5">
            <div v-for="item in filteredResults" :key="item.id">
              <usersList v-if="item.type === 'user'" :user="item" />
              <groupsList v-if="item.type === 'group'" :group="item" />
            </div>
          </TabPanel>
          <TabPanel class="h-full overflow-auto px-5"></TabPanel>
          <TabPanel class="h-full overflow-auto px-5"></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axiosConfig from "../../src/axiosConfig";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import usersList from "../components/usersList.vue";
import groupsList from "../components/groupsList.vue";
import { CometChat } from "@cometchat-pro/chat";
import { useRouter } from "vue-router";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useAuthStore } from "../stores/authStore";
const router = useRouter();
const authStore = useAuthStore();
const users = ref([]);
const groups = ref([]);
const searchQuery = ref("");
const currentTab = ref("all");
const fetch_users = () => {
  axiosConfig
    .get("users")
    .then((res) => {
      users.value = res.data.data
      // users.value = res.data.data.filter( user => user.uid !== authStore.userLoginInfo.uid )
    })
    .catch((error) => {
      console.log(error, "error");
    });
};
const fetch_groups = () => {
  axiosConfig
    .get("groups")
    .then((res) => {
      groups.value = res.data.data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};
const filteredResults = computed(() => {
    const combinedData = [
      ...users.value.map((user) => ({ ...user, type: "user" })),
      ...groups.value.map((group) => ({ ...group, type: "group" })),
    ];
    return searchQuery.value
      ? combinedData.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.value)
        )
      : combinedData;
});

const logout = () => {
  authStore.removeLoginInfo();
  localStorage.removeItem("userLoginInfo");
  console.log("Logout completed successfully");
  router.push({ name: "login" });
};
const go_profile_page = () => {
  router.push({ name: "profile" });
};
onMounted(() => {
  fetch_groups();
  fetch_users();
});
</script>

<style>

</style>
