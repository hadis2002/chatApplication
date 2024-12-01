import { createApp } from 'vue';
import { CometChat } from '@cometchat-pro/chat';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import '../src/style.css';

var appID = "2656060da2d3fa35";
var region = "eu";
var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
  },
  error => {
    console.log("Initialization failed with error:", error);
  }
);

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount('#app');
