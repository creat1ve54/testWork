<template>
  <VueFinalModal class="modal-first-stage" :click-to-close="true" :hide-overlay="true">
    <div class="modal-first-stage__container">
      <button class="modal-first-stage__close" @click="$emit('close')" aria-label="Закрыть">
        <svg width="32" height="32">
          <use xlink:href="../assets/icons/sprite.svg#close"></use>
        </svg>
      </button>
      <div class="modal-first-stage__main">
        <h2 class="modal-first-stage__title">Форма обратной связи</h2>
        <p class="modal-first-stage__text p-small">
          Пожалуйста, оцените свой опыт прохождения тестового
        </p>
        <div class="modal-first-stage__fields">
          <div class="field">
            <div class="field__container">
              <div class="field__title p-small">ФИО</div>
              <input type="text" placeholder="Иван Иванов" v-model="formData.name" />
            </div>
            <div class="field__error"></div>
          </div>
          <div class="field">
            <div class="field__container">
              <div class="field__title p-small">Почта</div>
              <input type="text" placeholder="Текст" v-model="formData.mail" />
            </div>
            <div class="field__error"></div>
          </div>
          <div class="field">
            <div class="field__container">
              <div class="field__title p-small">Номер телефона</div>
              <input
                type="tel"
                placeholder="+7 (000) 000 00 00"
                v-mask="'+7 (###) ### ## ##'"
                v-model="formData.phone"
              />
            </div>
            <div class="field__error"></div>
          </div>
        </div>
        <div class="modal-first-stage__numbers">
          <div class="modal-first-stage__number modal-first-stage__number--active">1</div>
          <div class="modal-first-stage__line">
            <div class="modal-first-stage__line--active" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="modal-first-stage__number">2</div>
        </div>
        <div class="modal-first-stage__btns">
          <button @click="$emit('close')" class="btn btn-secondary btn-secondary-l">
            <span>Отменить</span>
          </button>
          <button class="btn btn-primary btn-primary-l" @click="submit">
            <span>Далее</span>
          </button>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>
<script setup lang="ts">
import { useModal, VueFinalModal } from 'vue-final-modal'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, sameAs, minLength } from '@vuelidate/validators'
import { computed, reactive, ref } from 'vue'
import ModalSuccess from './ModalSuccess.vue'
import ModalDanger from './ModalDanger.vue'
import ModalSecondStage from './ModalSecondStage.vue'

const emit = defineEmits(['close'])

const formData = reactive({
  name: '',
  phone: '',
  mail: '',
})

const progress = computed(() => {
  const total = Object.keys(formData).length // всего 3 поля
  let filled = 0

  if (formData.name.trim()) filled++
  if (formData.mail.trim() && !v$.value.mail.$invalid) filled++
  if (formData.phone.trim() && !v$.value.phone.$invalid && formData.phone.length === 18) filled++

  return total > 0 ? (filled / total) * 100 : 0
})

function submit() {
  v$.value.$validate().then(async (result) => {
    if (result) {
      const { open, close } = useModal({
        component: ModalSecondStage,
        attrs: {
          onClose: () => close(),
        },
      })
      emit('close')
      open()
    } else {
      const { open, close } = useModal({
        component: ModalDanger,
        attrs: {
          onClose: () => close(),
        },
      })
      emit('close')
      open()
    }
  })
}

const rules = computed(() => ({
  name: { required: helpers.withMessage('Обязательное поле', required) },
  phone: {
    required: helpers.withMessage('Обязательное поле', required),
    minLength: helpers.withMessage('Проверьте номер телефона', minLength(17)),
  },
  mail: {
    required: helpers.withMessage('Обязательное поле', required),
    email: helpers.withMessage('Проверьте почту', email),
  },
}))

let v$ = useVuelidate(rules, formData)
</script>
<style lang="scss">
.modal-first-stage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 104px;
  }

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
    padding: 20px 12px;
    max-width: 637px;
    width: calc(100% - 30px);
  }

  &__numbers {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 198px;
    width: 100%;
    margin: 0 auto;
    gap: 16px;
  }

  &__number {
    flex: 0 0 auto;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $Neutrals300;
    border-radius: 100%;
    color: $Neutrals600;

    &--active {
      background-color: $BaseBlue;
      color: $Neutrals100;
    }
  }

  &__line {
    position: relative;
    width: 100%;
    height: 6px;
    border-radius: 6px;
    background-color: $Neutrals300;

    &--active {
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 6px;
      height: 6px;
      width: 0%;
      background-color: $BaseBlue;
      transition: all 0.3s ease-in-out;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 8px;
    font-size: 18px;
    line-height: 24px;
    padding: 0px 50px;
  }

  &__text {
    text-align: center;
    margin-bottom: 20px;
  }

  &__close {
    position: absolute;
    right: 8px;
    top: 8px;
    background-color: $Neutrals300;
    border-radius: 100%;
    padding: 8px;
  }

  &__labels {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 36px;
  }

  &__row {
    display: flex;
    gap: 28px;
    margin-bottom: 28px;
  }

  &__btns {
    display: flex;
    gap: 28px;
    margin-top: 40px;
    .btn {
      width: 100%;
    }
  }

  @include mobile {
  }
}
</style>
