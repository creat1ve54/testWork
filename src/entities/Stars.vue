<template>
  <div class="stars">
    <button
      v-for="(star, idx) in count"
      @click="setRating(idx + 1)"
      :class="{ active: idx + 1 <= model }"
    >
      <svg class="stars__item" width="44" height="44" v-if="idx + 1 > model">
        <use xlink:href="../assets/icons/sprite.svg#star"></use>
      </svg>
      <svg class="stars__item" width="44" height="44" v-else>
        <use xlink:href="../assets/icons/sprite.svg#star-active"></use>
      </svg>
    </button>
  </div>
</template>
<script setup>
const props = defineProps(['count'])

const model = defineModel({ type: Number, default: 0 })

function setRating(value) {
  model.value = value
}
</script>
<style scoped lang="scss">
.stars {
  display: flex;
  justify-content: center;
  gap: 22px;

  &__item {
    padding: 5.5px;
  }
}
</style>
