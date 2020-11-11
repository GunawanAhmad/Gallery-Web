<template>
    <div class="app">
        <div class="sidebar">
            <ul>
                <li @click="sidebarActiveCheck('your')" :class="sidebarActive == 'your' ? 'active-tab' : ''">
                    <p>Your albums</p>
                    <p class="result-number" :class="resultsCount.your < 1 ? 'zero-result' : '' ">{{ resultsCount.your }}</p>
                </li>
                <li @click="sidebarActiveCheck('other')" :class="sidebarActive == 'other' ? 'active-tab' : ''">
                    <p>Other albums</p>
                    <p class="result-number" :class="resultsCount.other < 1 ? 'zero-result' : '' ">{{ resultsCount.other }}</p>
                </li>
                <li @click="sidebarActiveCheck('user')" :class="sidebarActive == 'user' ? 'active-tab' : ''">
                    <p>Users</p>
                    <p class="result-number" :class="resultsCount.users < 1 ? 'zero-result' : '' ">{{ resultsCount.users }}</p>
                </li>
            </ul>
        </div>
        <div class="result-section">
            <h1 class="title-section">{{ results.length }} users</h1>
            <ul class="result-list">
                <li v-for="(result,index) in results" :key="index">
                    <p class="result-name">{{ result.username }}</p>
                    <p class="result-desc">{{ result.name }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            results : [{username : 'GunOne', name : 'Gunawan Nur Ahmad'},
                        {username : 'Nur', name : 'Nur Ahmad'}, 
                        {username : 'nurad', name : 'nurasdi ahmad'},
                        {username : 'nurere', name : 'Maximas'}],
            sidebarActive : 'user',
            resultsCount : {users : 4, other : 0, your : 2} 

        }
    },
    mounted() {
        console.log(this.$route.query.q)
    },
    methods : {
        sidebarActiveCheck(tab) {
            this.sidebarActive = tab;
        }
    }
}
</script>

<style scoped src="../../public/sass/searchResultPage.scss" lang="scss">

</style>