<template>
    <div class="header-view">
        <div class="logo">
            logo
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
    setup() {
        return {

        }
    }
}
</script>

<style scoped>
div.header-view {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    background-color:   rgb(255, 255, 255);
    box-shadow: 0 2px 2px 0 rgba(150, 150, 150, 0.2), 0 4px 4px 0 rgba(150, 150, 150, 0.1);
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


</style>