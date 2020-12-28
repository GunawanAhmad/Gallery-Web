<template>
  <div class="main">
    <div class="profile-container">
      <div class="photo">
        <img :src="avatar" alt="" ref="ava" />
      </div>
      <div class="name">
        <h1 class="fullname">{{ name }}</h1>
        <h2 class="username">{{ username }}</h2>
      </div>
      <div class="desc">
        <p>{{ bio }}</p>
      </div>
      <button class="edit-btn">Edit profile</button>
      <div class="follow-info">
        <span class="icon"><i class="fas fa-user-friends"></i></span>
        <span class="followers">0 Followers</span>
        <span class="following">4 Following</span>
      </div>
    </div>
    <div class="albums-container">
      <div class="album_section" v-for="(album, index) in albums" :key="index">
        <div class="title">
          <div
            class="album-name"
            @click="showPhotos(album.albumName, album._id, index)"
          >
            <span class="icon"><i class="fas fa-folder"></i></span>
            <span
              ><p>{{ album.albumName }}</p></span
            >
          </div>
          <div class="menu-logo" @click="showMenu(index)">
            <i class="fas fa-ellipsis-v"></i>
          </div>
        </div>
        <p class="album-desc">{{ album.description }}</p>
        <div class="menu">
          <ul>
            <li @click="deleteAlbum(album._id, index)">
              <button class="btn">Delete</button>
            </li>
            <li>
              <button class="btn">Edit</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="background" ref="background" @click="showMenu(null)"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    let username = this.$route.params.user;
    let headers;

    //check if the user we want to see is our page or not
    if (username == localStorage.getItem("username")) {
      // console.log(localStorage.getItem("token"))
      headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      //   console.log(headers);
    } else {
      headers = null;
    }

    axios
      .get("/" + username, { headers: headers })
      .then((res) => {
        // console.log(res);
        this.albums = res.data.user.albums;
        this.$store.state.albums = res.data.user.albums;
        this.name = res.data.user.name;
        this.bio = res.data.user.bio;
        this.username = res.data.user.username;
        if (!res.data.user.avatar) {
          this.$refs.ava.style.opacity = "0";
        }
        this.avatar = "http://localhost:5000/" + res.data.user.avatar;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      albums: [],
      isAddAlbum: false,
      username: "",
      name: "",
      bio: "",
      avatar: "",
    };
  },
  methods: {
    showPhotos(albumName, id, index) {
      let albumInfo = {
        index: index,
        id: id,
      };
      localStorage.setItem("albumInfo", JSON.stringify(albumInfo));
      this.$router.push({ path: `/gunawanart/${albumName}` });
    },
    showMenu(index) {
      const menuList = document.querySelectorAll(".menu");
      if (index !== null) {
        this.$refs.background.classList.toggle("show");
        menuList[index].classList.toggle("show");
        return;
      }

      this.$refs.background.classList.toggle("show");
      menuList.forEach((menu) => {
        menu.classList.remove("show");
      });
    },
    deleteAlbum(albumId, index) {
      console.log(albumId);

      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .delete("/deleteAlbum/" + albumId, { headers: headers })
        .then((res) => {
          console.log(res);
          this.showMenu(index);
          this.$store.commit("deleteAlbum", { index });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped src="../../public/sass/main.scss" lang="scss"></style>
