<template>
  <div class="main">
    <div class="container">
      <h1 class="main__title">Оставить отзыв</h1>
      <button @click="onOpenForm" class="main__btn btn btn-primary btn-primary-s">
        <div class="p-small">Открыть форму</div>
      </button>
      <ModalsContainer />
    </div>
  </div>
</template>

<script setup>
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalDescForm from './components/ModalDescForm.vue'
import ModalFirstStage from './components/ModalFirstStage.vue'

const onOpenForm = () => {
  if (window.innerWidth > 576) {
    onOpenDesk()
  } else {
    onOpenMob()
  }
}

function onOpenDesk() {
  const { open, close } = useModal({
    component: ModalDescForm,
    attrs: {
      onClose: () => close(),
    },
  })
  open()
}

function onOpenMob() {
  const { open, close } = useModal({
    component: ModalFirstStage,
    attrs: {
      onClose: () => close(),
    },
  })
  open()
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  &__title {
    text-align: center;
    margin-bottom: 20px;
  }

  &__btn {
    margin: 0 auto;
    .p-small {
      color: $Neutrals100;
    }
  }
}
</style>
