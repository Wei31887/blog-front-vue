<template>
    <div class="blog-outline-view">
        <div class="blog-catalog-title">
            <h3>
                Catalog
            </h3> 
        </div>
        <div class="blog-catalog-main">
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
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'BlogContent',
    props: ['element'],
    setup(props) {
        // console.dir(props.element.children[0])
        const catalog = ref()
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
        
        onMounted(() => {
            catalog.value = makeCatalog()
            console.log(catalog.value)
        })

        return {
            catalog
        }
    }
}

</script>

<style scoped>
div.blog-outline-view {
    font-size: smaller;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
ul {
    padding: 0;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
}

.level1{
    padding: 0;
    padding-top: 0.3rem;
}
.level2{
    padding-left: 0.5rem;
    padding-top: 0.3rem;
}
.level3{
    padding-left: 1rem;
    padding-top: 0.3rem;
}

</style>