<template>
    <div class="header-view">
        <div class="logo">
            <router-link :to="{name: 'HomePage'}">
                <img src="@/assets/logo.jpeg" alt="logo" id="logo">
            </router-link>
        </div>
        <div class="icon">
            <img id="link-icon" src="https://img.icons8.com/ios-glyphs/60/null/linkedin-circled--v1.png"/>
            <img id="link-icon" src="https://img.icons8.com/material-rounded/48/null/github.png"/>
        </div>   
    </div>
</template>
  

<script>

export default{
    name: "HeaderView",
}
</script>

<style scoped>
div.header-view {
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    background-color:   rgb(255, 255, 255);
    box-shadow: 0 1px 1px 0 rgba(150, 150, 150, 0.2), 0 3px 3px 0 rgba(150, 150, 150, 0.1);
}

div.icon {
    display: flex; 
    justify-content: center;
    align-items: center;
}

#link-icon {
    width: 30px;
    height: 30px;
}


a {
    /* padding: 0.5rem; */
    text-decoration: none;
}

div.logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

#logo {
    height: 2rem;
    padding: 0.6rem;
}


</style>