<template>
    <footer class="bg-gray-800 text-white py-8 header-gradient">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center">
          <!-- GIF Container -->
          <div class="w-full max-w-2xl mb-8 relative">
          </div>

          <!-- Social Media Icons -->
          <div class="flex gap-4 mb-4">
            <a href="https://www.instagram.com/wakeb1/" target="_blank" rel="noopener noreferrer">
              <img src="@/assets/ig.svg" alt="Instagram" class="w-6 h-6 hover:opacity-75 transition-opacity" />
            </a>
            <a href="https://www.facebook.com/WakeparkB1/" target="_blank" rel="noopener noreferrer">
              <img src="@/assets/fb.svg" alt="Facebook" class="w-6 h-6 hover:opacity-75 transition-opacity" />
            </a>
          </div>

          <!-- Footer Content -->
          <div class="text-center mt-4">
            <p class="text-sm text-gray-700 font-semibold">© 2025 Wakeb1.lt</p>
          </div>
        </div>
      </div>
    </footer>
</template>

<script setup>
// No script needed for this component
</script>

<style scoped>


.glass-footer a {
  transition: opacity 0.3s ease;
}

.glass-footer a:hover {
  opacity: 0.7;
}

.header-gradient {
  background: #7be05c;
  background: linear-gradient(0deg,rgba(114, 237, 76, 0.86) 11%, rgba(183, 233, 172, 0.62) 64%, rgba(233, 245, 233, 0.53) 79%, rgba(255, 255, 255, 0.15) 100%);
}
  </style>
