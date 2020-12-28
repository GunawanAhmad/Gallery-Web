<template>
  <div class="profile-container">
    <div class="title">
      <p>Public profile</p>
    </div>
    <div class="main">
      <div class="form">
        <div class="name input">
          <label for="name">Name</label>
          <input type="text" name="name" autocomplete="off" v-model="name" />
        </div>
        <div class="bio input">
          <label for="bio">Bio</label>
          <textarea name="bio" cols="30" rows="10" v-model="bio"></textarea>
        </div>
        <button class="btn" @click="updateProfile">Update profile</button>
      </div>
      <div class="img-profile" ref="imageBack">
        <img alt="" :src="avatar" ref="ava" />
        <div class="edit">
          <button class="edit-btn" @click="openOption">
            <i class="fas fa-pencil-alt"></i>
            <span>Edit</span>
          </button>

          <ul class="option" v-if="isShowingOption">
            <li>
              <button @click="openInput">Upload photo</button>
            </li>
            <li>
              <button @click="removeAva">Remove photo</button>
            </li>
          </ul>
          <input
            type="file"
            ref="photo"
            class="inputPhoto"
            @change="selectPhoto"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="background hide" @click="openOption" ref="background"></div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isShowingOption: false,
      selectedPhoto: "",
      name: "",
      bio: "",
      avatar: "",
    };
  },
  methods: {
    openOption() {
      this.isShowingOption = !this.isShowingOption;
      this.$refs.background.classList.toggle("hide");
    },
    openInput() {
      this.$refs.photo.click();
    },
    selectPhoto(e) {
      this.selectedPhoto = e.target.files[0];
      let path = URL.createObjectURL(this.selectedPhoto);
      this.avatar = path;
      this.$refs.ava.style.opacity = "1";
    },
    removeAva() {
      this.selectedPhoto = "delete";
      this.$refs.ava.src = "";
      this.$refs.ava.style.opacity = "0";
    },
    updateProfile() {
      console.log("hey");
      let token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("bio", this.bio);
      formData.append("avatar", this.selectedPhoto);

      axios
        .post("/updateProfile", formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          // console.log(res);
          localStorage.setItem("avatar", res.data.avatar);
          this.$store.state.avatar = "http://localhost:5000/" + res.data.avatar;
          console.log(res.data.avatar);
          if (this.selectedPhoto == "delete") {
            this.$store.state.avatar = "";
            localStorage.setItem("avatar", "");
            this.$store.state.avaImg.style.opacity = "0";
          } else {
            this.$store.state.avaImg.style.opacity = "1";
          }
          // this.$forceUpdate();
          this.selectedPhoto = "";
          this.$router.push({ path: "/" + res.data.username });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    let token = localStorage.getItem("token");
    axios
      .get("/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        this.name = res.data.user.name || "";
        this.bio = res.data.user.bio || "";
        this.avatar = "http://localhost:5000/" + res.data.user.avatar || "";
        if (!res.data.user.avatar) {
          this.$refs.ava.style.opacity = "0";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style
  scoped
  src="../../../public/sass/profileSetting.scss"
  lang="scss"
></style>
