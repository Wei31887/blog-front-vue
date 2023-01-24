<template>
    <el-sub-menu :index="navIndex" class="subItem">
        <template #title>
            <span> {{ item.b_name }} </span>
        </template>
    </el-sub-menu>
</template>
  
<script>
export default {
    name: "TypeItem",
    props: ['item', 'navIndex']
}
</script>
  
<style scoped>
</style>
  