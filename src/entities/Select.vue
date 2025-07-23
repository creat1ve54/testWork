<template>
  <div class="select" v-if="event === 'hover'">
    <button
      @mouseenter="show = true"
      ref="referenceRef"
      class="select__btn select__btn--hover"
      aria-label="Открыть"
    >
      <span v-if="title" class="select__btn-title">{{ title }}</span>
      <slot v-if="!title" name="header" />
    </button>

    <teleport to="body">
      <div
        v-if="show"
        ref="floatingRef"
        class="select__case select__case--hover"
        :style="computedFloatingStyles"
      >
        <div
          class="select__overlay"
          @click="
            () => {
              show = !show
            }
          "
        ></div>
        <slot name="content" />
      </div>
    </teleport>
  </div>
  <div class="select" :class="{ 'select--active': show }" v-else>
    <button
      ref="referenceRef"
      @click="
        () => {
          show = !show
        }
      "
      class="select__btn"
      aria-label="Показать"
    >
      <span v-if="title" class="select__btn-title">{{ title }}</span>
      <slot v-if="!title" name="header" />
    </button>

    <teleport to="body" v-if="toBody">
      <div v-if="show" ref="floatingRef" class="select__case" :style="computedFloatingStyles">
        <div
          class="select__overlay"
          @click="
            () => {
              show = !show
            }
          "
        ></div>
        <div ref="floatingArrow" class="select__arrow" :style="arrowStyles" v-if="isArrow">
          <svg
            width="36"
            height="15"
            viewBox="0 0 36 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 0L35.3205 15H0.679443L18 0Z" fill="white" />
          </svg>
        </div>

        <button
          class="select__close"
          @click="
            () => {
              show = !show
            }
          "
        ></button>

        <slot name="content" />
      </div>
    </teleport>
    <template v-else>
      <div v-if="show" ref="floatingRef" class="select__case" :style="computedFloatingStyles">
        <div
          class="select__overlay"
          @click="
            () => {
              show = !show
            }
          "
        ></div>
        <div ref="floatingArrow" class="select__arrow" :style="arrowStyles" v-if="isArrow">
          <svg
            width="36"
            height="15"
            viewBox="0 0 36 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 0L35.3205 15H0.679443L18 0Z" fill="white" />
          </svg>
        </div>

        <button
          class="select__close"
          @click="
            () => {
              show = !show
            }
          "
        ></button>

        <slot name="content" />
      </div>
    </template>
  </div>
</template>
<script setup>
import { useFloating, flip, autoUpdate, offset, arrow, shift } from '@floating-ui/vue'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
  },
  event: {
    type: String,
  },
  isArrow: {
    type: Boolean,
    default: true,
  },
  toBody: {
    type: Boolean,
    default: true,
  },
  placement: {
    type: String,
    default: 'bottom',
  },
})
let show = ref(false)
defineExpose({ close })

const emit = defineEmits(['closed']) // описываем событие

function close() {
  show.value = false
}

const referenceRef = ref(null)
const floatingRef = ref(null)

const floatingArrow = ref(null)

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target
    const reference = referenceRef.value
    const floating = floatingRef.value

    if (!reference?.contains(target) && !floating?.contains(target)) {
      show.value = false
    }
  })
})

const { floatingStyles, middlewareData, placement } = useFloating(referenceRef, floatingRef, {
  whileElementsMounted: autoUpdate,
  placement: props.placement,
  // placement: "bottom-start",
  middleware: [
    flip(),
    props.isArrow ? offset(15) : offset(1),
    shift({ padding: 8 }),
    props.isArrow ? arrow({ element: floatingArrow }) : null,
  ],
})

const windowWidth = ref(window?.innerWidth)

window?.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth
})

const computedFloatingStyles = computed(() => {
  if (windowWidth.value <= 576) {
    return {}
  }
  return floatingStyles.value
})

const arrowStyles = computed(() => {
  const data = middlewareData.value.arrow
  if (!data) return {}

  const side = placement.value.split('-')[0]

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[side]

  return {
    left: data.x != null ? `${data.x}px` : '',
    top: data.y != null ? `${data.y}px` : '',
    [staticSide]: '-14px',
  }
})

watch(show, (val) => {
  if (!val) {
    emit('closed')
  }
})
</script>
<style lang="scss">
.select {
  &__arrow {
    display: flex;
    align-items: center;
    position: absolute;
    width: 34px;
    height: 15px;

    // background-image: url("~/assets/icons/svg/triangle.svg");

    filter: drop-shadow(0px -15px 10px rgba(0, 0, 0, 0.15));
    z-index: 2;
  }

  &__close {
    position: absolute;
    right: 24px;
    top: 28px;
    z-index: 12;
    width: 30px;
    height: 30px;
    background-image: url('~/assets/icons/svg/close-select.svg');
  }

  &__container {
    position: absolute;
    // z-index: 3;
    width: 100%;
    background-color: $Neutrals100;
    border-radius: 4px;
    // padding: 20px;
  }

  &__case {
    z-index: 9;

    &--hover {
      opacity: 0;
      visibility: hidden;

      // transition: all 0.2s ease-in-out;
      transition:
        visible 0.2s ease-in-out,
        opacity 0.2s ease-in-out;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          opacity: 1;
          visibility: visible;
          // transition: all 0.2s ease-in-out;
          transition:
            visible 0.2s ease-in-out,
            opacity 0.2s ease-in-out;
        }
      }
    }
  }

  &__btn {
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        & ~ .select__case {
          opacity: 1;
          visibility: visible;
          transition:
            visible 0.2s ease-in-out,
            opacity 0.2s ease-in-out;
        }
      }
    }
  }

  &__overlay {
    display: none;
    z-index: 8;
    opacity: 0.1;
    position: fixed;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 100vh;
  }

  @include mediumMobile {
  }
}
</style>
