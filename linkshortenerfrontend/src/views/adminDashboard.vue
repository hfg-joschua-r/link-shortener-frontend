<template>
  <router-link to="/" style="display: block; text-align: left"
    >Zurück zum Link-Shortener.</router-link
  >
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
  <h1 style="display: block; text-align: center">Admin Dashboard</h1>
  <ul>
    <div>
      <li
        v-for="link in linkCollection"
        v-bind:key="link.originalURL"
        class="itemContainer"
      >
        <h3 class="headerLink">{{ link.originalURL }}</h3>
        <h3 class="headerLink">{{ link.shortCode }}</h3>
        <h3 class="subHeader">
          Anzahl Verwendungen:
          <span class="highlightedNumber">{{ link.clickCounter }}</span>
        </h3>
        <h3 class="subHeader">Erstellt am: {{ convert(link.dateCreated) }}</h3>
        <button class="btnUpdate" @click=deleteEntryByID(link.adminCode)>löschen</button>
        <h3 class="subHeader">Admin-Code: {{ link.adminCode }}</h3>
      </li>
    </div>
  </ul>
  <img src="../assets/fileIllu.svg" class="illustration">
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
            console.log(this.linkCollection);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convert(time) {
      // Months array
      var months_arr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      // Convert timestamp to milliseconds
      var date = new Date(time);
      // Year
      var year = date.getFullYear();
      // Month
      var month = months_arr[date.getMonth()];
      // Day
      var day = date.getDate();
      // Hours
      var hours = date.getHours();
      // Minutes
      var minutes = "0" + date.getMinutes();
      // Seconds
      var seconds = "0" + date.getSeconds();
      // Display date time in MM-dd-yyyy h:m:s format
      var convdataTime = day + "." + month +"." + year +", " +hours + ":" + minutes.substr(-2) +":" + seconds.substr(-2);
      return convdataTime;
    },
    async deleteEntryByID(id) {
      let payload = {
        adminLink: id,
      };
      await axios
        .post("http://localhost:3000/code/deleteExisting", payload)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            console.log("sucess");
            this.showUpdateSucess = true;
            this.getEveryLinkInDB();
            setTimeout(() => {
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
  float: right;
  margin-left: -50%;
  margin-top: 2em;
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
.logo {
  position: fixed;
  left: 1540px;
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
.itemContainer {
  background: #bee3db;
  overflow: hidden;
}
li {
  list-style-type: none;
  margin: 1%;
  margin-right: 30%;
  padding: 1%;
}
.headerLink {
  font-size: 24px;
}
.highlightedNumber {
  font-weight: 700;
  font-size: 24px;
}
.subHeader {
  font-size: 18px;
  display: block;
  width: 50%;
}
.subHeader2 {
  font-size: 18px;
  display: inline-block;
  width: 60%;
}
.illustration {
  position: fixed;
  left: 1300px;
  top: 100px;
}
</style>