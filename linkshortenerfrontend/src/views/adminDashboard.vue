<template>
<router-link to="/">Zurück zum Link-Shortener.</router-link>
  <div id="notifications">
    <transition name="fade">
      <notification
        v-if="showUpdateSucess"
        message="Datenbank Eintrag wurde erfolgreich geändert!"
        type="sucess"
      />
    </transition>
    <transition name="fade">
      <notification
        v-if="showFailure"
        message="Etwas ist schiefgelaufen!"
        type="failure"
      />
    </transition>
  </div>
  <h1>Admin Dashboard</h1>
  <ul>
      <li v-for="link in linkCollection" v-bind:key="link.originalURL">
          {{ link.originalURL }}
      </li>
  </ul>
  
  <a href="https://www.hfg-gmuend.de/"
    ><img src="../assets/Gmuend_logo.svg" class="logo"
  /></a>
</template>
<script>
import axios from "axios";
import notification from "../components/notification.vue";
export default {
  async mounted() {
    await this.getEveryLinkInDB();
  },
  components: {
    notification,
  },
  data: function () {
    return {
      linkCollection: [{}],
      showUpdateSucess: false,
      showFailure: false,
    };
  },
  methods: {
    async getEveryLinkInDB() {
      await axios
        .get("http://localhost:3000/adminDashboard/getAllEntries")
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            this.linkCollection = res.data;
            console.log(this.linkCollection)
          }
        })
        .catch(err => {
            console.log(err)
        });
    },
    async updateLink() {
      if (this.updatedURL !== "") {
        let payload = {
          adminLink: this.$route.params.code,
          newURL: this.updatedURL,
        };
        await axios
          .post("http://localhost:3000/code/updateExisting", payload)
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              console.log("sucess");
              this.showUpdateSucess = true;
              setTimeout(() => {
                this.showUpdateSucess = false;
              }, 3000);
            } else this.showFailure = true;
          })
          .catch((error) => {
            console.log(error);
            this.showFailure = true;
            setTimeout(() => {
              this.showFailure = false;
            }, 3000);
          });
      }
    },
    async deleteLink(adminCode) {
      let payload = {
        adminLink: adminCode,
      };
      await axios
        .post("http://localhost:3000/code/deleteExisting", payload)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            console.log("sucess");
            this.showUpdateSucess = true;
            setTimeout(() => {
              window.location.href="http://localhost:8080";
              this.showUpdateSucess = false;
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
          this.showFailure = true;
          setTimeout(() => {
            this.showFailure = false;
          }, 3000);
        });
    },
  },
};
</script>
<style scoped>
body {
  background-color: #faf9f9;
  text-align: left;
}
li {
    text-align: left;
}
.input {
  display: inline-block;
  background: #bee3db;
  font-family: inherit;
  font-size: 22px;
  font-weight: normal;
  width: 550px;
  height: 35px;
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
  background: #bb753c;
  color: #ffffff;
  border: none;
  width: 300px;
  height: 60px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 18px;
  font-family: inherit;
  font-weight: 500;
}
.btn:focus {
  outline: none;
}
.btnUpdate {
  position: relative;
  display: inline-block;
  background: #2c3e50;
  color: #ffffff;
  border: none;
  width: 140px;
  height: 42px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 18px;
  font-family: inherit;
  font-weight: 500;
  margin-left: 1%;
}
.btnContainer {
  float: left;
  margin-left: 4%;
}
.logo {
  position: absolute;
  left: 30px;
  top: 800px;
}
.highlight {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 24px;
  margin-top: 15%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #faf9f9;
  color: #000000;
}
p {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 18px;
  margin-left: 4%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  background-color: #faf9f9;
  color: #000000;
}
h1 {
  text-align: left;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 42px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>