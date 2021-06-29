<template>
  <div id="notifications">
    <transition name="fade">
      <notification
        v-if="showCopySucess"
        message="Link wurde erfolgreich in die Zwischenablage kopiert!"
        type="sucess"
      />
    </transition>
    <transition name="fade">
      <notification
        v-if="showFailure"
        message="Die angegebene URL ist nicht gültig! :("
        type="failure"
      />
    </transition>
  </div>
  <h3>{{ info }}</h3>
  <h1 class="header">Kürze deine URL.</h1>
  <input
    class="input"
    type="text"
    v-model="inputUrl"
    placeholder="https://hfg-gmuend.de"
  />
  <button @click="getGeneratedAbbrevation(inputUrl)" class="btn">Kürzen!</button
  ><br />
  <input
    @click="copyFromOutputField"
    type="text"
    class="input"
    v-model="generatedUrl"
    v-bind:readonly="outputFieldDisabled"
    id="outputInputField"
  />
  <i
    class="el-icon-copy-document"
    id="copyIcon"
    v-bind:disabled="outputFieldDisabled"
  ></i>
  <button
    v-on:click="outputFieldDisabled = !outputFieldDisabled"
    class="btn"
    style="width: 57px; margin-right: 95px"
    id="editBtn"
    v-bind:style="[
      outputFieldDisabled
        ? 'background: #555B6E;'
        : 'background: #FAF9F9; border: 2px solid #555B6E; color: #555B6E;',
    ]"
  >
    <i class="el-icon-edit" -vbind:disabled="outputFieldDisabled"></i></button
  ><br />
  <br />
  <p>{{ AdminLink }}</p>

  <el-row :gutter="20">
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple">
    <discord-picker
    input
    :value="value"
    id="emojiPicker"
    gif-format="md"
    @update:value="value = $event"
    @emoji="setEmoji"
    @gif="setGif"
  />
  </div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>

  <img src="../assets/plantIllu.svg" class="illustration" />
  <a href="https://www.hfg-gmuend.de/"
    ><img src="../assets/Gmuend_logo.svg" class="logo"
  /></a>
</template>

<script>
import axios from "axios";
import notification from "./notification.vue";
import DiscordPicker from 'vue3-discordpicker';

export default {
  name: "UrlShortener",
  components: {
    notification,
    DiscordPicker,
  },
  data: function () {
    return {
      generatedUrl: "",
      outputFieldDisabled: true,
      showCopySucess: false,
      showFailure: false,
      info: "",
      inputUrl: "",
      AdminLink: "",
      clientIpAddress: "",
      value: ''
    };
  },
  mounted() {
    /*axios.get("http://localhost:3000/fgEmojiPicker.js").then((result) => {
      console.log(result);
      new result.data.FgEmojiPicker({
        trigger: ["#editBtn"],
        position: ["bottom", "right"],
        emit(obj, triggerElement) {
          const emoji = obj.emoji;
          console.log(triggerElement);
          document.querySelector("outputInputField").value += emoji;
        },
      });
    }); */
  },
  methods: {
    /*onInput(event) {
      console.log(event.data);
    }, */
    copyFromOutputField() {
      var outputField = document.getElementById("outputInputField");
      if (this.outputFieldDisabled && outputField.value != "") {
        outputField.select();
        document.execCommand("copy");
        this.showCopySucess = true;

        setTimeout(() => {
          this.showCopySucess = false;
        }, 4000);
      }
    },
    async getGeneratedAbbrevation() {
      if (!this.inputUrl.includes("https://"))
        this.inputUrl = "https://" + this.inputUrl;

      this.AdminLink = this.generateAdminLink();
      this.clientIpAddress = await this.getClientIpAdress();
      console.log(this.clientIpAddress);
      let payload = {
        url: this.inputUrl,
        adminLink: this.AdminLink,
        ipAddress: this.clientIpAddress,
      };
      axios
        .post("http://localhost:3000/code/generate", payload)
        .then((response) => {
          if (response.status == 200)
            this.generatedUrl =
              "http://localhost:8080/link/" + response.data.url;
          this.AdminLink =
            "Dein Verwaltungs-Admin Link ist: http://localhost:8080/admin/" +
            this.AdminLink;
        })
        .catch((error) => {
          console.log(error);
          this.showFailure = true;
          setTimeout(() => {
            this.showFailure = false;
          }, 3000);
        });
    },
    generateAdminLink() {
      return Math.random().toString(36).substring(2, 15);
    },
    async getClientIpAdress() {
      return axios
        .get("https://api.ipify.org?format=json")
        .then((response) => {
          this.clientIpAddress = response.data.ip;
          return response.data.ip;
        })
        .catch((error) => {
          console.log(error);
          return "0.0.0.0";
        });
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
#copyIcon {
  position: absolute;
  color: #bee3db;
  margin-top: 1%;
  left: 56%;
  font-size: 28px;
}
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap");
body {
  background-color: #faf9f9;
}
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #faf9f9;
  color: #2c3e50;
  margin-top: 60px;
}
.header {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 63px;
  margin-top: 15%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #faf9f9;
  color: #000000;
}
.input {
  background: #bee3db;
  font-family: inherit;
  font-size: 22px;
  font-weight: normal;
  width: 458px;
  height: 57px;
  left: 408px;
  padding-left: 1%;
  border-style: none;
}
.input:disabled {
  background: #89b0ae;
  font-family: inherit;
  font-weight: normal;
  width: 458px;
  height: 57px;
  left: 408px;
}
input:read-only {
  background: #89b0ae;
  font-family: inherit;
  font-weight: normal;
}
input:focus {
  outline: none;
}
.btn {
  display: inline-block;
  background: #555b6e;
  color: #bee3db;
  border: none;
  width: 151px;
  height: 57px;
  margin: 0px 0px 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 22px;
  font-family: inherit;
  font-weight: 600;
}
.btn:focus {
  outline: none;
}
.logo {
  position: absolute;
  left: 30px;
  top: 800px;
}
.illustration {
  position: fixed;
  left: 1400px;
  top: 550px;
  width: 30%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 100px;
}
.bg-purple {
  background: #faf9f9;
}
</style>