<template>
    <div class="blog-outline-view">
        <ul class="catalog">
            <li v-for="(item, index) in catalog" :key="index" 
            :class="'level'+item.level"
            >
                <a :href="'#' + item.id" >
                    {{item.title}}
                    <!-- {{'level'+item.level}} -->
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, } from 'vue'


export default {
    name: 'BlogCatalog',
    props: ['element'],
    setup(props) {
        const makeCatalog = () => {
            const titleTag = ['H1', 'H2', 'H3']
            let titles = []
            Array.from(props.element.children).forEach((item, index) => {
                const id = "header-" + index
                item.setAttribute('id', id)
                if (titleTag.includes(item.nodeName)) {
                    titles.push({
                        id: id,
                        title: item.innerHTML,
                        level: Number(item.nodeName.substring(1,2)),
                        nodeName: item.nodeName
                    })
                }
            })
            return titles
        }
        
        const catalog = computed(() => {
            return makeCatalog()
        })

        return {
            catalog
        }
    }
}

</script>

<style scoped>
div.blog-outline-view {
    border-left: solid 1px var(--border-color);
    padding: 1rem;
    position: sticky;
    right: 0;
    top: calc(var(--header-height) + 10px);

    font-size: smaller;
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    overflow: scroll;
}
ul {
    padding: 0.5rem;
}
li {
    list-style: none;
    text-align: left;
}
a {
    text-decoration: none;
    color: rgb(110, 110, 110);
    font-size: medium;
    font-weight: bold;
    
}
a:active {
    text-decoration: none;
    color: rgb(58, 58, 58);
}
a:focus {
    text-decoration: none;
    color: rgb(58, 58, 58);
}

.level1{
    padding: 0;
    padding-top: 0.5rem;
}
.level2{
    padding-left: 0.5rem;
    padding-top: 0.5rem;
}
.level3{
    padding-left: 1rem;
    padding-top: 0.5rem;
}

</style>