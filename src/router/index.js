import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import EditPostView from '../views/EditPostView.vue'
import ManagePostsView from '../views/ManagePostsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView,
    },
    {
      path: '/post/create',
      name: 'createPost',
      component: CreatePostView,
    },
    {
      path: '/post/edit/:id',
      name: 'editPost',
      component: EditPostView,
    },
    {
      path: '/posts/manage',
      name: 'managePosts',
      component: ManagePostsView,
    },
  ],
})

export default router
