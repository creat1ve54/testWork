<template>
  <VueFinalModal class="modal-danger" :click-to-close="true" :hide-overlay="true">
    <div class="modal-danger__container">
      <button class="modal-danger__close" @click="$emit('close')" aria-label="Закрыть">
        <svg width="32" height="32">
          <use xlink:href="../assets/icons/sprite.svg#close"></use>
        </svg>
      </button>
      <div class="modal-danger__main">
        <h2 class="modal-danger__title">Что-то пошло не так</h2>
        <p class="modal-danger__text p-small">Попробуйте заполнить форму позже</p>
        <div class="modal-danger__img">
          <img src="../assets/images/error.png" alt="Ошибка" />
        </div>
        <div class="modal-danger__btns">
          <button
            @click="$emit('close')"
            class="modal-danger__btn btn btn-secondary btn-secondary-l"
          >
            Закрыть
          </button>
          <button @click="onOpenForm" class="modal-danger__btn btn btn-primary btn-primary-l">
            Попробовать снова
          </button>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>
<script setup lang="ts">
import { useModal, VueFinalModal } from 'vue-final-modal'
import ModalDescForm from './ModalDescForm.vue'
import ModalFirstStage from './ModalFirstStage.vue'

const emit = defineEmits(['close'])

const onOpenForm = () => {
  emit('close')

  if (window.innerWidth > 576) {
    const { open, close } = useModal({
      component: ModalDescForm,
      attrs: {
        onClose: () => close(),
      },
    })
    open()
  } else {
    const { open, close } = useModal({
      component: ModalFirstStage,
      attrs: {
        onClose: () => close(),
      },
    })
    open()
  }
}
</script>
<style lang="scss">
.modal-danger {
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

  &__btns {
    display: flex;
    gap: 28px;
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
    width: 100%;
    margin: 0 auto;
    padding: 14px;
  }

  @include mediumMobile {
    &__btns {
      flex-direction: column;
    }

    .btn-primary {
      order: -1;
    }
  }
}
</style>
