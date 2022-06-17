<template>
  <div class="container mx-auto">
    <div class="pt-10 mx-2 lg:mx-10 mb-4">
      <form>
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            v-model="search"
            type="text"
            class="w-full border pl-10 border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring focus:ring-amber-400"
            placeholder="Cari Surah..."
          />
        </div>
      </form>
    </div>
    <div class="grid lg:grid-cols-3 gap-4 p-2 lg:p-10">
      <div v-for="(surah, index) in searchSurah" :key="index">
        <router-link
          :to="{ name: 'surah', params: { id: surah.number } }"
          class="flex w-full p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 hover:outline-none hover:ring hover:ring-amber-400"
        >
          <span
            class="flex items-center pr-3 mr-3 text-xl border-r-2 border-gray-200"
            >{{ surah.number }}</span
          >
          <div>
            <h5
              class="mb-2 text-xl font-semibold tracking-tight text-amber-400"
            >
              {{ surah.name.transliteration.id }}
            </h5>
            <p class="font-normal text-gray-700">
              {{ surah.revelation.id }} | {{ surah.numberOfVerses }} Ayat
            </p>
          </div>
          <span class="flex items-center ml-auto font-medium text-2xl arab">
            {{ surah.name.short }}
          </span>
        </router-link>
      </div>
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
</template>

<script>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import BackToTop from "vue-backtotop";

export default {
  components: { BackToTop },
  setup() {
    let surahs = ref([]);

    const search = ref("");

    const searchSurah = computed(() => {
      return surahs.value.filter((surah) => {
        return (
          surah.name.transliteration.id
            .toLowerCase()
            .split("-")
            .join(" ")
            .indexOf(search.value.toLowerCase()) != -1
        );
      });
    });

    onMounted(() => {
      axios
        .get("https://api.quran.sutanlab.id/surah")
        .then((result) => {
          surahs.value = result.data.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    return {
      surahs,
      searchSurah,
      search,
    };
  },
};
</script>

<style></style>
