<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <h1>Ga<span>lio</span></h1>
      </router-link>
    </div>
    <ul class="nav__ul">
      <li class="nav__list search">
        <input
          type="text"
          ref="searchInput"
          @focusout="closeResultBar"
          @focus="openResultBar"
          v-model="inputSearch"
        />
        <span class="search__logo" @click="showSearchInput" ref="searchLogo">
          <i class="fas fa-search"></i>
        </span>
        <div class="search-result" v-show="resultShow">
          <ul
            ref="suggestionBar"
            @mouseover="suggestBoxHover"
            @mouseout="suggestBoxHover"
          >
            <li @click="selectSuggestion(inputSearch)">
              <p>{{ inputSearch }}</p>
              <span class="logo"><i class="fas fa-search"></i></span>
            </li>
            <li
              v-for="(data, index) in arrSearchResult"
              :key="index"
              @click="selectSuggestion(data.name)"
            >
              {{ data.name }}
            </li>
          </ul>
        </div>
      </li>
      <li class="nav__list name">{{ username }}</li>
      <li class="img-profile nav__list">
        <div class="img" @click="toggleMenu">
          <img :src="ava" alt="" ref="ava" />
        </div>
        <ul class="menu__list" ref="menuList">
          <li @click="toggleMenu">
            <router-link :to="'/' + username + '/add-album'"
              >New album</router-link
            >
          </li>
          <li @click="toggleMenu">
            <router-link :to="'/' + username">Your profile</router-link>
          </li>
          <li @click="toggleMenu">
            <router-link to="/settings/profile">Settings</router-link>
          </li>
          <li @click="toggleMenu">Log out</li>
        </ul>
      </li>
    </ul>
    <div class="invis-background" ref="invisBack" @click="toggleMenu"></div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      resultShow: false,
      arrSearchResult: [],
      inputSearch: "",
      username: "",
      avatar: "http://localhost:5000/" + localStorage.getItem("avatar"),
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.$store.state.avaImg = this.$refs.ava;
    // console.log(localStorage.getItem("avatar"));
    if (!localStorage.getItem("avatar")) {
      this.$refs.ava.style.opacity = "0";
    }
  },
  computed: {
    ava() {
      if (!this.$store.state.avatar) {
        // this.$refs.ava.style.opacity = "0";

        return "http://localhost:5000/" + localStorage.getItem("avatar");
      }
      return this.$store.state.avatar;
    },
  },
  watch: {
    inputSearch(value) {
      if (value != "") {
        this.resultShow = true;
        this.$refs.searchInput.classList.add("result-show");

        //search from API

        let headers = {
          Authorization: "Bearer " + localStorage.getItem("token"),
        };
        axios
          .get("/queryUser/" + value, { headers: headers })
          .then((res) => {
            this.arrSearchResult = res.data.users;
          })
          .catch((err) => console.log(err));
      } else {
        this.resultShow = false;
        this.$refs.searchInput.classList.remove("result-show");
      }
    },
  },
  methods: {
    toggleMenu() {
      this.$refs.menuList.classList.toggle("show");
      this.$refs.invisBack.classList.toggle("show");
    },
    showSearchInput() {
      this.$refs.searchInput.classList.toggle("show");
      this.$refs.searchLogo.classList.toggle("show");
      this.inputSearch = "";
    },
    showSearchResult() {
      console.log("masuk");
    },

    //close suggestion bar when input is out of focus
    closeResultBar() {
      if (!this.$refs.suggestionBar.classList.contains("hovered")) {
        this.resultShow = false;
        this.$refs.searchInput.classList.remove("result-show");
      }
    },
    suggestBoxHover() {
      this.$refs.suggestionBar.classList.toggle("hovered");
    },

    //open suggestion bar when input is in focus
    openResultBar() {
      if (this.inputSearch != "") {
        this.resultShow = true;
        this.$refs.searchInput.classList.add("result-show");
      }
    },
    selectSuggestion(data) {
      this.resultShow = false;
      this.$refs.searchInput.classList.remove("result-show");
      this.inputSearch = data;
      this.resultShow = false;
      this.$refs.searchInput.classList.remove("result-show");
      this.$router.push({ path: "/search", query: { q: data } });
    },
  },
};
</script>

<style scoped src="../../public/sass/navbar.scss" lang="scss"></style>
