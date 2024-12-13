<script setup lang="ts">
import { Sidebar, vToggle } from '@/components/manguito-theme/lib'
import { ref } from 'vue'

const sidebarRef = ref<InstanceType<typeof Sidebar>>()
const openSidebar = () => {
  sidebarRef.value!.open()
}
</script>

<template>
  <section class="container">
    <div class="flex justify-center gap-xs my-md">
      <button class="btn btn-success" v-toggle:sidebar-default>
        Sidebar Default Header
      </button>
      <button class="btn btn-danger" v-toggle:sidebar-left>Sidebar Left</button>
      <button class="btn btn-warning" v-toggle:sidebar-right>
        Sidebar Right
      </button>
      <button class="btn btn-info" v-toggle:sidebar-right-2>
        Default Sidebar Right
      </button>
    </div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui neque,
      malesuada sit amet lacus sit amet, mollis vestibulum justo. Duis vel elit
      eget ligula condimentum feugiat ut vel magna. Curabitur consequat, nibh
      quis commodo suscipit, nulla nibh dapibus quam, non dictum elit mauris sed
      diam. Suspendisse orci arcu, placerat ut ante pellentesque, efficitur
      cursus dui. Mauris laoreet consequat hendrerit. Morbi et venenatis enim.
      Donec quis hendrerit ipsum. In nunc dui, interdum at orci rhoncus,
      scelerisque finibus risus.
    </p>
    <p>
      Mauris in gravida tellus. In vestibulum, odio tempor posuere sollicitudin,
      lorem diam imperdiet augue, vel efficitur lacus quam vel justo. Nam
      finibus gravida turpis, vitae efficitur arcu pharetra eu. Ut eget urna
      ligula. Proin id urna quis diam vehicula commodo eget vitae nisi. Ut ut
      nibh sed justo dignissim pharetra et vel ipsum. Mauris tortor tortor,
      vehicula sed mattis quis, sagittis ac velit. Curabitur a posuere metus, at
      consequat libero. Aliquam laoreet scelerisque tellus, at auctor nibh
      porttitor sed. Vivamus rhoncus scelerisque ligula, in tristique orci
      volutpat vitae. Ut porta dapibus nulla, non tristique ante accumsan ac.
      Suspendisse nec congue lorem. Vivamus bibendum accumsan lorem, ac pretium
      leo blandit vitae. Maecenas accumsan commodo nisi ut tincidunt. Etiam sit
      amet lacus nec lorem lobortis fringilla. Aenean tempor commodo finibus.
    </p>
    <p>
      Fusce sit amet faucibus arcu. Ut id sem at ipsum porttitor commodo quis ac
      mi. Pellentesque varius mattis neque, a ornare odio hendrerit ut.
      Curabitur tempus feugiat ex non fringilla. Proin facilisis ac nisi eu
      egestas. Nunc vitae egestas dui. Cras in ligula ut est tristique iaculis
      ac non lectus. Vestibulum ut enim nisi. Suspendisse rutrum, enim sit amet
      faucibus facilisis, ante dolor scelerisque diam, in faucibus nisi ante ac
      magna.
    </p>
    <p>
      Morbi vestibulum dolor nisi, quis cursus enim ornare id. Quisque egestas
      sit amet lectus quis congue. Duis diam velit, dignissim nec pharetra et,
      dignissim ac eros. Nam lacus est, congue vel rutrum sit amet, pulvinar at
      mauris. Donec quis dignissim leo. Aenean condimentum eleifend felis, ac
      pharetra diam vehicula vel. Proin eget pretium nunc. Nulla facilisi.
      Maecenas augue est, ultricies non urna eu, ornare accumsan tellus. Nullam
      faucibus lorem libero, in faucibus ex suscipit sed. Maecenas sed luctus
      est, ut finibus lectus. Etiam nec sollicitudin lacus. Mauris dapibus massa
      vitae placerat porttitor. Mauris imperdiet mollis purus. Quisque ac sem
      risus.
    </p>
    <p>
      Pellentesque feugiat urna sit amet arcu elementum ultricies. Curabitur
      tempor ligula aliquet, suscipit turpis ut, dignissim velit. Nunc lorem
      turpis, rutrum ac lacus eu, tristique viverra magna. Integer est turpis,
      posuere vitae tellus nec, efficitur commodo magna. Vestibulum tristique
      justo quis nulla venenatis, quis posuere neque finibus. Vestibulum ante
      ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
      Mauris at neque turpis. Interdum et malesuada fames ac ante ipsum primis
      in faucibus. Sed eu facilisis purus, rhoncus efficitur dolor. Duis vitae
      ultricies mauris. Donec quis luctus tortor. Cras eu pretium arcu. Cras ut
      turpis eros. Mauris venenatis eros diam.
    </p>
    <div class="flex justify-center my-sm">
      <button @click="openSidebar" class="btn btn-danger btn-progress">
        <span> Trigger through ref </span>
      </button>
    </div>
    <sidebar
      id="sidebar-default"
      title="Sidebar title"
      color="success"
      ref="sidebarRef"
    >
      <template #body>
        <div class="py-sm px-xs">
          <img
            src="https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1685840063/ManguitoPage/xl0fo7vevr5nhxpnnztq.jpg"
            class="mb-sm"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            fermentum commodo dolor eget aliquet. Donec malesuada lorem dictum,
            varius augue ut, congue lacus. Proin ornare nisl cursus vehicula
            bibendum. Maecenas gravida semper erat quis posuere. Suspendisse eu
            interdum orci. Suspendisse pellentesque finibus lacus, ac ultrices
            libero placerat sed. Vestibulum ac purus velit. Duis at euismod mi,
            quis malesuada erat. Sed feugiat cursus massa, et posuere tellus
            sagittis non. Suspendisse consectetur ligula eu nunc malesuada
            bibendum. Maecenas quis leo a tellus vulputate imperdiet.
            Suspendisse suscipit lobortis massa, nec tristique quam sagittis
            sed. Nulla eget accumsan orci, laoreet mollis quam. Proin neque
            velit, suscipit ac tortor ut, mattis rhoncus massa. Suspendisse non
            eros mi. Sed ut urna sed ex finibus consectetur.
          </p>
        </div>
      </template>
      <template #footer>
        <div class="p-xs bg-success">
          <h3 class="h3-sm">Footer text</h3>
        </div>
      </template>
    </sidebar>
    <sidebar id="sidebar-left" class-name="bg-light-1 px-xs overflow-scroll">
      <template #header="{ close }">
        <div class="flex justify-end pb-md pt-xs bg-light-1">
          <button @click="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
              class="fill-dark-2 hover:fill-dark-1 focus:fill-dark-1 transition-colors duration-300 ease-linear h-sm"
            >
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </button>
        </div>
      </template>
      <template #body="{ status }">
        <div>
          <h2 class="h2-md mb-md">This is sidebar left</h2>
          <p>Toggle Status: {{ status }}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            fermentum commodo dolor eget aliquet. Donec malesuada lorem dictum,
            varius augue ut, congue lacus. Proin ornare nisl cursus vehicula
            bibendum. Maecenas gravida semper erat quis posuere. Suspendisse eu
            interdum orci. Suspendisse pellentesque finibus lacus, ac ultrices
            libero placerat sed. Vestibulum ac purus velit. Duis at euismod mi,
            quis malesuada erat. Sed feugiat cursus massa, et posuere tellus
            sagittis non. Suspendisse consectetur ligula eu nunc malesuada
            bibendum. Maecenas quis leo a tellus vulputate imperdiet.
            Suspendisse suscipit lobortis massa, nec tristique quam sagittis
            sed. Nulla eget accumsan orci, laoreet mollis quam. Proin neque
            velit, suscipit ac tortor ut, mattis rhoncus massa. Suspendisse non
            eros mi. Sed ut urna sed ex finibus consectetur.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            fermentum commodo dolor eget aliquet. Donec malesuada lorem dictum,
            varius augue ut, congue lacus. Proin ornare nisl cursus vehicula
            bibendum. Maecenas gravida semper erat quis posuere. Suspendisse eu
            interdum orci. Suspendisse pellentesque finibus lacus, ac ultrices
            libero placerat sed. Vestibulum ac purus velit. Duis at euismod mi,
            quis malesuada erat. Sed feugiat cursus massa, et posuere tellus
            sagittis non. Suspendisse consectetur ligula eu nunc malesuada
            bibendum. Maecenas quis leo a tellus vulputate imperdiet.
            Suspendisse suscipit lobortis massa, nec tristique quam sagittis
            sed. Nulla eget accumsan orci, laoreet mollis quam. Proin neque
            velit, suscipit ac tortor ut, mattis rhoncus massa. Suspendisse non
            eros mi. Sed ut urna sed ex finibus consectetur.
          </p>
        </div>
      </template>
      <template #footer>
        <div class="py-xs bg-light-1">
          <h4 class="h4-md">This is Footer content</h4>
        </div>
      </template>
    </sidebar>
    <sidebar
      id="sidebar-right"
      placement="right"
      no-backdrop
      width="450"
      class-name="bg-warning p-xs"
    >
      <template #header="{ close }">
        <div class="flex justify-start mb-md">
          <button @click="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
              class="fill-dark-2 hover:fill-dark-1 focus:fill-dark-1 transition-colors duration-300 ease-linear h-sm"
            >
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </button>
        </div>
      </template>
      <template #body>
        <div>
          <h2 class="h2-md mb-md">This is sidebar right</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            fermentum commodo dolor eget aliquet. Donec malesuada lorem dictum,
            varius augue ut, congue lacus. Proin ornare nisl cursus vehicula
            bibendum. Maecenas gravida semper erat quis posuere. Suspendisse eu
            interdum orci. Suspendisse pellentesque finibus lacus, ac ultrices
            libero placerat sed. Vestibulum ac purus velit. Duis at euismod mi,
            quis malesuada erat. Sed feugiat cursus massa, et posuere tellus
            sagittis non. Suspendisse consectetur ligula eu nunc malesuada
            bibendum. Maecenas quis leo a tellus vulputate imperdiet.
            Suspendisse suscipit lobortis massa, nec tristique quam sagittis
            sed. Nulla eget accumsan orci, laoreet mollis quam. Proin neque
            velit, suscipit ac tortor ut, mattis rhoncus massa. Suspendisse non
            eros mi. Sed ut urna sed ex finibus consectetur.
          </p>
        </div>
      </template>
    </sidebar>
    <sidebar
      id="sidebar-right-2"
      placement="right"
      title="Default Sidebar Right"
      color="info"
    >
      <template #body>
        <div class="p-xs">
          <h2 class="h2-md mb-md">This is sidebar right with default header</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            fermentum commodo dolor eget aliquet. Donec malesuada lorem dictum,
            varius augue ut, congue lacus. Proin ornare nisl cursus vehicula
            bibendum. Maecenas gravida semper erat quis posuere. Suspendisse eu
            interdum orci. Suspendisse pellentesque finibus lacus, ac ultrices
            libero placerat sed. Vestibulum ac purus velit. Duis at euismod mi,
            quis malesuada erat. Sed feugiat cursus massa, et posuere tellus
            sagittis non. Suspendisse consectetur ligula eu nunc malesuada
            bibendum. Maecenas quis leo a tellus vulputate imperdiet.
            Suspendisse suscipit lobortis massa, nec tristique quam sagittis
            sed. Nulla eget accumsan orci, laoreet mollis quam. Proin neque
            velit, suscipit ac tortor ut, mattis rhoncus massa. Suspendisse non
            eros mi. Sed ut urna sed ex finibus consectetur.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            fermentum commodo dolor eget aliquet. Donec malesuada lorem dictum,
            varius augue ut, congue lacus. Proin ornare nisl cursus vehicula
            bibendum. Maecenas gravida semper erat quis posuere. Suspendisse eu
            interdum orci. Suspendisse pellentesque finibus lacus, ac ultrices
            libero placerat sed. Vestibulum ac purus velit. Duis at euismod mi,
            quis malesuada erat. Sed feugiat cursus massa, et posuere tellus
            sagittis non. Suspendisse consectetur ligula eu nunc malesuada
            bibendum. Maecenas quis leo a tellus vulputate imperdiet.
            Suspendisse suscipit lobortis massa, nec tristique quam sagittis
            sed. Nulla eget accumsan orci, laoreet mollis quam. Proin neque
            velit, suscipit ac tortor ut, mattis rhoncus massa. Suspendisse non
            eros mi. Sed ut urna sed ex finibus consectetur.
          </p>
        </div>
      </template>
      <template #footer>
        <div class="p-xs bg-info">
          <h3 class="h3-sm">Footer text</h3>
        </div>
      </template>
    </sidebar>
  </section>
</template>
