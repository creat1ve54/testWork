<template>
  <VueFinalModal class="modal-success" :click-to-close="true" :hide-overlay="true">
    <div class="modal-success__container">
      <button class="modal-success__close" @click="$emit('close')" aria-label="Закрыть">
        <svg width="32" height="32">
          <use xlink:href="../assets/icons/sprite.svg#close"></use>
        </svg>
      </button>
      <div class="modal-success__main">
        <h2 class="modal-success__title">Спасибо, ваш ответ отправлен</h2>
        <p class="modal-success__text p-small">Свяжемся с вами в ближайшее время</p>
        <div class="modal-success__img">
          <img src="../assets/images/success.png" alt="Успешно" />
        </div>
        <button @click="$emit('close')" class="modal-success__btn btn btn-primary btn-primary-l">
          На главную
        </button>
      </div>
    </div>
  </VueFinalModal>
</template>
<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits(['close'])
</script>
<style lang="scss">
.modal-success {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;

  &__container {
    height: 100%;
    overflow: auto;
    max-height: max-content;
    position: absolute;
    background-color: #ffffff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    padding: 44px;
    max-width: 637px;
    width: 100%;
  }

  &__title {
    text-align: center;
    margin-bottom: 8px;
  }

  &__text {
    text-align: center;
    margin-bottom: 95px;
  }

  &__img {
    text-align: center;
    margin-bottom: 95px;
  }

  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  &__btn {
    min-width: 260px;
    margin: 0 auto;
    padding: 14px;
  }

  @include mobile {
  }
}
</style>
