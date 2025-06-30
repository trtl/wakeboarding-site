<template>

  <div class="min-h-screen pt-16"> <!-- pt-16 to account for fixed header -->
    
      
      <!-- Section 1: Location -->
      <section class="container mx-auto px-4 mt-8 mb-24"> 
        <div class="relative w-3/4 mx-auto"> <!-- Changed from w-2/3 to w-3/4 -->
          <img 
            src="@/assets/location.jpg" 
            alt="WakeB1 Location" 
            class="w-full aspect-[16/9] object-cover rounded-lg shadow-lg" 
          />
        </div>

      
        
        <div class="flex justify-end mt-4">
          <router-link 
            to="/contacts" 
            class="text-gray-800 text-xl font-bold border-b-2 border-transparent hover:border-gray-800 transition-all duration-300 mr-[12.5%]" 
          >
            kaip mus rasti? >>
          </router-link>
        </div>
      </section>


  
      <!-- Section 2: About -->
      <section class="bg-gray-50 py-12">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="md:w-1/2">
              <h2 class="text-3xl font-bold mb-4">Apsilankyk pas mus!</h2>
              <p class="text-lg text-gray-600 leading-relaxed">
                Wake B1 – tai vandens sporto ir pramogų parkas
                tarp Kauno ir Jonavos esančiame Užusalių tvenkinyje.
                Tai ypatingai jauki vieta ne tik sportuoti, bet ir
                puikiai praleisti laiką.
              </p>
            </div>
            <div class="md:w-1/2">
              <img src="@/assets/wakeboarding.jpg" alt="Wakeboarding Action" class="rounded-lg shadow-lg w-full" />
            </div>
          </div>
        </div>
      </section>
  
      <!-- Section 4: Pricing -->
      <section id="prices" data-test="prices-section" class="container mx-auto px-4 mt-8 mb-24 prices-gradient">
        <h2 class="text-3xl font-bold text-center mb-6">Kainos</h2>

        <!-- Plaukimai Section -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Plaukimai</h3>

          <!-- Header for Time Intervals -->
          <div class="grid grid-cols-3 gap-4 mb-4 text-center">
            <div></div> <!-- Empty cell for spacing -->
            <div class="font-semibold">I-V iki 17:00</div>
            <div class="font-semibold">I-V po 17:00 ir savaitgaliai</div>
          </div>

          <!-- 20min Row -->
          <div class="grid grid-cols-3 items-center gap-4 mb-4">
            <img src="@/assets/20min.png" alt="20min" class="w-16 h-16" />
            <div class="border border-black px-4 py-2 text-center">16 €</div>
            <div class="border border-black px-4 py-2 text-center">18 €</div>
          </div>

          <!-- 60min Row -->
          <div class="grid grid-cols-3 items-center gap-4">
            <img src="@/assets/60min.png" alt="60min" class="w-16 h-16" />
            <div class="border border-black px-4 py-2 text-center">45 €</div>
            <div class="border border-black px-4 py-2 text-center">50 €</div>
          </div>
        </div>

        <!-- Nuoma Section (Separate) -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Nuoma</h3>

          <div class="flex justify-between items-center mb-4">
            <span>Vandenlentė:</span>
            <div class="border border-black px-4 py-2 text-center">5 €</div>
          </div>

          <div class="flex justify-between items-center mb-4">
            <span>Hidrokostiumas:</span>
            <div class="border border-black px-4 py-2 text-center">5 €</div>
          </div>

          <div class="flex justify-between items-center mb-4">
            <span>Irklentė 30min:</span>
            <div class="border border-black px-4 py-2 text-center">5 €</div>
          </div>


        </div>

        <p class="text-center text-gray-500 italic mt-6">
          Dėl abonentų kreipkitės telefonu arba el. paštu.
        </p>
      </section>

      <section id="camps" class="container mx-auto px-4 py-12">
       
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img 
            src="@/assets/childcamp.png" 
            alt="Children Camp" 
            class="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div class="flex flex-col justify-center">
             <h2 class="text-3xl font-bold text-center mb-8">Vaikų Stovyklos</h2>
             <p class="text-lg text-gray-700 mb-4">
              Rengiam dienos stovyklas, kuriose mokome plaukti ant vandenlentės. Patyrę instruktoriai užtikrins saugumą ir linksmas pamokas. 
              Dėl registracijos ar papildomos informacijos kreipkitės 
              <router-link 
                to="/contacts" 
                class="hover:underline transition-all duration-200"
              >
                telefonu arba el. paštu
              </router-link>.
            </p>
          </div>
        </div>
      </section>
  </div>
</template>
  

<script>

</script>

<style scoped>

.prices-gradient {
  background: #7be05c;
background: radial-gradient(circle,rgba(123, 224, 92, 0.86) 0%, rgba(183, 233, 172, 0.74) 7%, rgba(233, 245, 233, 0.53) 39%, rgba(255, 255, 255, 0.15) 100%);
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
}
</style>