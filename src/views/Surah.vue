<template>
  <div class="container mx-auto">
    <div class="py-10 lg:px-48">
      <h2 class="text-center text-3xl font-bold mb-6 text-emerald-700">
        Surah {{ surahs.id }}
      </h2>
      <h4 class="text-center text-xl mb-6">
        {{ arti.id }} | {{ jumlahAyat }} Ayat
      </h4>
      <div class="flex">
        <div class="w-full">
          <h2 class="text-2xl flex justify-center mb-4 arab">
            {{ prebismillah.arab }}
          </h2>
        </div>
      </div>
      <div
        v-for="(ayat, index) in ayats"
        :key="index"
        class="bg-white rounded-md shadow-md border-b mx-2"
      >
        <ul class="flex flex-wrap w-full p-2 lg:p-6">
          <li
            class="w-10 mr-1"
          >
            <span class="flex justify-center items-center w-10 h-10 bg-amber-200 border-amber-300 mr-4 rounded-full border-2 arab text-2xl">{{ ayat.number.inSurah }}</span>
          </li>
          <li class="flex-1 w-5/6">
            <h2
              class="text-2xl flex justify-end text-right mb-4 leading-loose arab"
            >
              {{ ayat.text.arab }}
            </h2>
            <audio controls class="mb-2">
              <source :src="ayat.audio.primary" type="audio/mpeg" />
            </audio>
            <p class="mb-2 font-medium text-emerald-700 lowercase">
              {{ ayat.text.transliteration.en }}
            </p>
            <p class="font-normal text-gray-700">
              {{ ayat.translation.id }}
            </p>
          </li>
        </ul>
      </div>
      <back-to-top bottom="40px" right="40px" visibleoffset="40">
        <button
          type="button"
          class="flex justify-center items-center w-14 h-14 text-white rounded-full bg-amber-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </back-to-top>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BackToTop from "vue-backtotop";

export default {
  components: { BackToTop },
  setup() {
    // get id
    const route = useRoute();
    const id = route.params.id;

    let surahs = ref("");
    let arti = ref("");
    let jumlahAyat = ref("");
    let ayats = ref([]);
    let prebismillah = ref("");

    onMounted(() => {
      axios
        .get(`https://api.quran.sutanlab.id/surah/` + id)
        .then((result) => {
          surahs.value = result.data.data.name.transliteration;
          arti.value = result.data.data.name.translation;
          jumlahAyat.value = result.data.data.numberOfVerses;
          ayats.value = result.data.data.verses;
          prebismillah.value = result.data.data.preBismillah.text;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    return {
      surahs,
      route,
      id,
      arti,
      jumlahAyat,
      ayats,
      prebismillah,
    };
  },
};
</script>

<style></style>
