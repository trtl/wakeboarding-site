import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import BookingPage from '@/views/BookingPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import ContactPage from '@/views/ContactPage.vue'
import PaymentSuccess from '@/views/SuccesPage.vue'
import PaymentCancel from '@/views/CancelPage.vue'




const routes = [
  { path: '/',name: 'Home',component: HomePage },
  { path: '/profile',name: 'Profile',component: ProfilePage, meta: { requiresAuth: true }},
  { path: '/booking',name: 'Booking',component: BookingPage }, 
  { path: '/contacts',name: 'Contact',component: ContactPage },
  
  
  {
    path: '/success',
    name: 'PaymentSuccess',
    component: PaymentSuccess
  },
  {
    path: '/cancel',
    name: 'PaymentCancel',
    component: PaymentCancel
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Improved navigation guard with auth state check
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
      
      if (requiresAuth && !user) {
        next('/')
      } else {
        next()
      }
      resolve()
    })
  })
})

export default router