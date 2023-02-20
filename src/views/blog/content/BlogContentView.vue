<template>
  <div class="blog-content-view">
    <div class="blog-content">
      <div class="blog-content-info">
        <el-page-header @back="goback">
          <template #content>
            <span>
              <h1>{{ Title }}</h1>
            </span>
          </template>
          <div class="blog-content-info-detail">
            <ul>
              <li>
                <el-icon><View /></el-icon>
                Create time: {{ AddTime }}
              </li>
              <li>
                <el-icon><View /></el-icon>
                Click: {{ Click }}
              </li>
              <li>
                <el-icon><View /></el-icon>
                Tags: {{}}
              </li>
            </ul>
          </div>
        </el-page-header>
      </div>
      <div class="blog-content-context">
        <MarkdownContent
          v-if="Content"
          :source="Content"
          ref="markedHTML"
        ></MarkdownContent>
      </div>
      <div class="blog-prev-next">
        <PrevNext v-if="PrevNextBlog" :prevnext="PrevNextBlog"> </PrevNext>
      </div>
      <div class="blog-comment">
        <!-- <Comment></Comment> -->
        <Comment2 :comments="BlogCommentList"></Comment2>
      </div>
    </div>

  </div>
</template>

<script>
import { BlogContent } from "@/api/blog";
import { onMounted, reactive, toRefs, watch, ref, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import MarkdownContent from "@/components/blog/content/MarkdownContent";
import PrevNext from "@/components/blog/content/PrevNext.vue";
import Comment2 from "@/components/blog/content/Comment2.vue";

export default {
  name: "BlogContentView",
  components: {
    MarkdownContent,
    PrevNext,
    Comment2,
  },

  setup() {
    const markedState = reactive({
      markedHTML: "",
      propHTML: "",
    });

    watch(
      () => markedState.markedHTML.markedContent,
      () => {
        markedState.propHTML = markedState.markedHTML.markedContent;
      }
    );

    const router = useRouter();
    const route = useRoute();

    const ControlState = reactive({
      PrevNextBlog: {
        nextBlog: {},
        prevBlog: {},
      },
    });

    const BlogState = reactive({
      Title: "",
      Id: 0,
      Content: "",
      AddTime: "",
      UpdateTime: "",
      CommentList: {},
      Click: 0,
    });

    const BlogCommentList = ref();

    // methods
    const loadingContent = (blog_id) => {
      BlogContent({
        id: blog_id,
      })
        .then((res) => {
          if (res.status == 200) {
            let temp = res.data.data["blog"];
            BlogState.Title = temp.title;
            BlogState.Id = temp.id;
            BlogState.Content = temp.content;
            BlogState.AddTime = temp.add_time;
            BlogState.UpdateTime = temp.update_time;
            BlogState.Click = temp.click_hit;

            BlogCommentList.value = res.data.data["comments"];
            ControlState.PrevNextBlog.nextBlog = res.data.data["next"];
            ControlState.PrevNextBlog.prevBlog = res.data.data["prev"];
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const goback = () => {
      router.back();
    };

    // provide
    provide("loadingContent", loadingContent);

    // watch
    watch(route, (to) => {
      let toId = parseInt(to.params.id);
      if (toId != BlogState.Id) {
        BlogState.Id = toId;
        loadingContent(BlogState.Id);
      }
    });

    // mounted
    onMounted(() => {
      BlogState.Id = parseInt(route.params.id);
      loadingContent(BlogState.Id);
    });

    return {
      ...toRefs(markedState),
      ...toRefs(BlogState),
      ...toRefs(ControlState),
      loadingContent,
      BlogCommentList,
      goback,
    };
  },
};
</script>

<style scoped>
div.blog-content-view {
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

div.blog-content {
  margin: 0 auto;
  text-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1.5rem;
  flex-grow: 1;
  width: 85%;
}

div.blog-outline {
  width: 15%;
}

div.blog-content-info-detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

div.blog-prev-next {
  display: flex;
  width: 100%;
}

div.blog-comment {
  position: relative;
  bottom: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: small;
  color: rgb(107, 107, 107);
}
</style>
