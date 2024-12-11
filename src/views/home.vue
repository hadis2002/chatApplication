<template>
  <div class="bg-gray-900 h-dvh">
    <div class="h-[15%] flex justify-center items-center">
      <div
        class="relative w-[60%] bg-white py-2.5 px-4 rounded-full flex justify-center items-center"
      >
        <input
          @keyup="searchQuery = $event.target.value"
          type="text"
          class="search-box text-right me-7 w-full text-sm outline-none"
          placeholder="جستجو"
        />
        <div class="absolute right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D3D3D3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      <div class="menu-box w-[20%] flex justify-end">
        <svg
          @click="toggle_sidebar"
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 30 30"
        >
          <path
            fill="#fff"
            d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"
          ></path>
        </svg>
      </div>
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 -translate-x-full"
        enter-to-class="transform opacity-100 -translate-x-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 -translate-x-0"
        leave-to-class="transform opacity-0 -translate-x-full"
      >
        <div
          v-if="sidebar"
          class="menu-content bg-black w-full h-full fixed top-0 bg-opacity-60 z-30"
          @click="close_sidebar"
        >
          <div
            class="bg-slate-900 h-full w-[50%] fixed right-0 top-0 z-50 transition-transform transform"
            :class="{ 'translate-x-0': sidebar, '-translate-x-full': !sidebar }"
          >
            <div class="h-full p-10">
              <div
                @click="close_sidebar"
                class="flex h-[10%] justify-end cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-x"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <div class="h-[80%]">
                <ul dir="rtl" class="flex flex-col gap-10 text-white">
                  <li>تنظیمات</li>
                  <li @click="logout">خروچ از حساب</li>
                  <li>ایجاد گروه</li>
                  <li @click="go_profile_page">پروفایل من</li>
                  <li>دعوت دوستان</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="h-[85%] flex flex-col items-center">
      <TabGroup>
        <TabList class="flex justify-around h-[12%] w-[90%]">
          <Tab
            @click="currentTab = 'all'"
            class="!bg-transparent text-white outline-none"
          >
            همه گفت و گو ها
          </Tab>
          <Tab
            @click="currentTab = 'users'"
            class="!bg-transparent text-white outline-none"
          >
            مخاطبین
          </Tab>
          <Tab
            @click="currentTab = 'groups'"
            class="!bg-transparent text-white outline-none"
          >
            گروه ها
          </Tab>
        </TabList>

        <TabPanels class="h-[88%] w-full">
          <TabPanel class="h-full overflow-auto px-5">
            <div v-for="item in filteredResults" :key="item.id">
              <usersList v-if="item.type === 'user'" :user="item" />
              <groupsList v-if="item.type === 'group'" :group="item" />
            </div>
          </TabPanel>

          <TabPanel class="h-full overflow-auto px-5">
            <usersList
              v-for="user in filteredResults"
              :key="user"
              :user="user"
            ></usersList>
          </TabPanel>

          <TabPanel class="h-full overflow-auto px-5">
            <groupsList
              v-for="group in filteredResults"
              :key="group"
              :group="group"
            ></groupsList>
          </TabPanel>
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
import { useAuthStore } from "../stores/authStore";
const router = useRouter();
const authStore = useAuthStore();
const sidebar = ref(false);
const users = ref([]);
const groups = ref([]);
const searchQuery = ref("");
const currentTab = ref("all");
const toggle_sidebar = () => {
  sidebar.value = true;
};
const close_sidebar = () => {
  sidebar.value = false;
};
const fetch_users = () => {
  axiosConfig
    .get("users?perPage=100&page=1")
    .then((res) => {
      users.value = res.data.data;
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
  if (currentTab.value == "all") {
    const combinedData = [
      ...users.value.map((user) => ({ ...user, type: "user" })),
      ...groups.value.map((group) => ({ ...group, type: "group" })),
    ];
    return searchQuery.value
      ? combinedData.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.value)
        )
      : combinedData;
  }
  if (currentTab.value == "users") {
    return searchQuery.value
      ? users.value.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.value)
        )
      : users.value;
  }
  if (currentTab.value == "groups") {
    return searchQuery.value
      ? groups.value.filter((group) =>
          group.name.toLowerCase().includes(searchQuery.value)
        )
      : groups.value;
  }
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
.tabs {
  display: flex;
  cursor: pointer;
}
.tabs button {
  border: none;
  background-color: #f0f0f0;
}
.tabs button.active {
  background-color: #d3d3d3;
  font-weight: bold;
  border-bottom: 3px solid rgb(155, 131, 221);
  color: rgb(155, 131, 221);
}
</style>
