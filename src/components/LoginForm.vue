<template>
  <div class="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <!-- Close Button -->
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Login Form -->
      <div v-if="!isSignup">
        <h2 class="text-2xl font-bold mb-6">Prisijungti</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-2">el. paštas</label>
            <input 
              v-model="email" 
              type="email" 
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div>
            <label class="block text-gray-700 mb-2">slaptažodis</label>
            <input 
              v-model="password" 
              type="password" 
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Prisijungti
          </button>
        </form>
        <p class="mt-4 text-center text-gray-600">
          Neturi paskyros? 
          <span 
            @click="isSignup = true" 
            class="text-blue-600 cursor-pointer hover:underline"
          >
            Registruotis
          </span>
        </p>
      </div>

      <!-- Signup Form -->
      <div v-else>
        <h2 class="text-2xl font-bold mb-6">Registruotis</h2>
        <form @submit.prevent="handleSignup" class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-2">vardas</label>
            <input 
              v-model="name" 
              type="text" 
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div>
            <label class="block text-gray-700 mb-2">el. paštas</label>
            <input 
              v-model="email" 
              type="email" 
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div>
            <label class="block text-gray-700 mb-2">telefonas</label>
            <input 
              v-model="phone" 
              type="tel" 
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div>
            <label class="block text-gray-700 mb-2">slaptažodis</label>
            <input 
              v-model="password" 
              type="password" 
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Registruotis
          </button>
        </form>
        <p class="mt-4 text-center text-gray-600">
          Jau turite paskyra? 
          <span 
            @click="isSignup = false" 
            class="text-blue-600 cursor-pointer hover:underline"
          >
            Prisijungti
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, defineEmits } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'


const router = useRouter()
const isSignup = ref(false)
const email = ref('')
const password = ref('')
const name = ref('')
const phone = ref('')

const handleLogin = async () => {
  try {
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email.value, password.value)
    // Close the form after successful login
    emit('close')
    router.push('/profile') 
  } catch (error) {
    console.error('Login error:', error)
    // Handle error (show message to user)
  }
}

const handleSignup = async () => {
  try {
    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email.value, 
      password.value
    )
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name: name.value,
      email: email.value,
      phone: phone.value,
      createdAt: new Date()
    })

    // Close the form after successful signup
    emit('close')
    router.push('/profile') 
  } catch (error) {
    console.error('Signup error:', error)
    // Handle error (show message to user)
  }
}

const emit = defineEmits(['close'])
</script>