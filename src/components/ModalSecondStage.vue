<template>
  <VueFinalModal class="modal-second-stage" :click-to-close="true" :hide-overlay="true">
    <div class="modal-second-stage__container">
      <button class="modal-second-stage__close" @click="$emit('close')" aria-label="Закрыть">
        <svg width="32" height="32">
          <use xlink:href="../assets/icons/sprite.svg#close"></use>
        </svg>
      </button>
      <div class="modal-second-stage__main">
        <h2 class="modal-second-stage__title">Форма обратной связи</h2>
        <p class="modal-second-stage__text p-small">
          Пожалуйста, оцените свой опыт прохождения тестового
        </p>
        <Stars :count="5" v-model="rating" />
        <template v-if="rating != 0">
          <div class="modal-second-stage__labels" v-if="rating <= 3">
            <label class="custom-radio" v-for="(word, idx) in starWords[0].items">
              <input type="radio" name="starWord" :checked="idx == 0" />
              <span>{{ word }}</span>
            </label>
          </div>
          <div class="modal-second-stage__labels" v-else>
            <label class="custom-radio" v-for="(word, idx) in starWords[1].items">
              <input type="radio" name="starWord" :checked="idx == 0" />
              <span>{{ word }}</span>
            </label>
          </div>
        </template>
        <div class="modal-second-stage__fields">
          <div class="field">
            <div class="field__container">
              <div class="field__title p-small">Грейд</div>
              <Select
                ref="offerRef"
                class="modal-second-stage__grade-select"
                :isArrow="false"
                :placement="'bottom-start'"
                :toBody="false"
              >
                <template v-slot:header>
                  <div class="modal-second-stage__grade-select-head">
                    <div
                      class="modal-second-stage__grade-select-placeholder"
                      v-if="gradeText == ''"
                    >
                      Выберите
                    </div>
                    <div class="modal-second-stage__grade-select-text" v-else>{{ gradeText }}</div>
                    <svg width="24" height="24">
                      <use xlink:href="../assets/icons/sprite.svg#arrow-down"></use>
                    </svg>
                  </div>
                </template>
                <template v-slot:content>
                  <div class="select__container">
                    <div class="modal-second-stage__grade-select-list">
                      <label
                        class="modal-second-stage__grade-select-item"
                        @click="
                          () => {
                            gradeChange(grade)
                            offerRef?.close?.()
                          }
                        "
                        v-for="grade in gradeList"
                      >
                        <div class="modal-second-stage__grade-select-item-text">{{ grade }}</div>
                      </label>
                    </div>
                  </div>
                </template>
              </Select>
            </div>
          </div>
          <div class="field">
            <div class="field__container">
              <div class="field__title p-small">Дополнительная информация</div>
              <textarea
                v-model="formData.text"
                type="text"
                placeholder="Что понравилось и не понравилось"
              />
            </div>
            <div class="field__error"></div>
          </div>
        </div>
        <div class="modal-second-stage__numbers">
          <div class="modal-second-stage__number modal-second-stage__number--active">1</div>
          <div class="modal-second-stage__line">
            <div class="modal-second-stage__line--active"></div>
          </div>
          <div class="modal-second-stage__number modal-second-stage__number--active">2</div>
        </div>
        <div class="modal-second-stage__btns">
          <button @click="onBack" class="btn btn-secondary btn-secondary-l">
            <span>Назад</span>
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
import Stars from '@/entities/Stars.vue'
import Select from '@/entities/Select.vue'
import ModalSuccess from './ModalSuccess.vue'
import ModalDanger from './ModalDanger.vue'
import ModalFirstStage from './ModalFirstStage.vue'

const starWords = [
  {
    items: [
      'Не понятно',
      'Однообразно',
      'Скучно',
      'Неудобно',
      'Ничего не понял',
      'Слишком сложно для тестового',
    ],
  },
  {
    items: [
      'Интересно',
      'Легко',
      'Быстро сделал',
      'Красиво',
      'Подробно описано',
      'Все понятно и по делу',
    ],
  },
]

const gradeList = ['Junior', 'Middle', 'Senior', 'Team Lead']

const rating = ref(0)

const offerRef = ref(null)

const props = defineProps(['title'])

const emit = defineEmits(['close'])

const gradeText = ref('')

const gradeChange = (text) => {
  gradeText.value = text
}

const formData = reactive({
  text: '',
})

const onBack = () => {
  emit('close')
  const { open, close } = useModal({
    component: ModalFirstStage,
    attrs: {
      onClose: () => close(),
    },
  })
  open()
}

function submit() {
  v$.value.$validate().then(async (result) => {
    emit('close')

    if (result && gradeText.value != '' && rating.value != 0) {
      const { open, close } = useModal({
        component: ModalSuccess,
        attrs: {
          onClose: () => close(),
        },
      })
      open()
    } else {
      const { open, close } = useModal({
        component: ModalDanger,
        attrs: {
          onClose: () => close(),
        },
      })
      open()
    }
  })
}

const rules = computed(() => ({
  text: { required: helpers.withMessage('Обязательное поле', required) },
}))

let v$ = useVuelidate(rules, formData)
</script>
<style lang="scss">
.modal-second-stage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;

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

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
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
      width: 100%;
      background-color: $BaseBlue;
      transition: all 0.3s ease-in-out;
    }
  }

  .stars {
    margin-bottom: 16px;
  }

  .select {
    &__btn {
      width: 100%;
    }

    &__close {
      display: none;
    }

    &__case {
      width: 100%;
    }
  }

  &__grade-select {
    position: relative;
    &-head {
      font-family: $FFDMSans;
      display: flex;
      justify-content: space-between;
      padding: 10px 16px;
      background-color: $Neutrals200;
      width: 100%;
      border-radius: 8px;
    }

    &-item {
      cursor: pointer;
      display: block;
      padding: 13px 16px;
      transition: all 0.3s ease-in-out;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: $Neutrals200;
          transition: all 0.3s ease-in-out;
        }
      }
    }

    &-placeholder {
      color: $Neutrals500;
    }
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

  &__title {
    text-align: center;
    margin-bottom: 8px;
    font-size: 18px;
    line-height: 24px;
    padding: 0px 50px;
  }

  &__text {
    text-align: center;
    margin-bottom: 8px;
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
