<script setup lang="ts">
import { TabContainer, TabContent } from '@/components/manguito-theme/lib'
</script>

<template>
  <div class="container">
    <TabContainer
      :body-class="['flex', 'flex-col', 'gap-sm']"
      :content-container-class="[
        'bg-light-4',
        'px-xs',
        'py-sm',
        'rounded-md',
        'overflow-hidden',
      ]"
    >
      <template #tab-button="{ update }">
        <div class="btn-group">
          <button class="btn btn-primary" @click="update(0)">Tab 0</button>
          <button class="btn btn-secondary" @click="update(1)">Tab 1</button>
          <button class="btn btn-success" @click="update(2)">Tab 2</button>
          <button class="btn btn-info" @click="update(3)">Tab 3</button>
        </div>
      </template>
      <template #tab-content>
        <TabContent :tab-index="0">
          <div class="bg-primary rounded-md p-xs">
            Tab 0: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Corrupti, asperiores neque. Neque consectetur delectus ut in
            molestias, distinctio praesentium similique voluptas quasi numquam
            excepturi hic omnis necessitatibus debitis, a porro repellendus
            cumque eos voluptatum maiores nostrum eveniet! Deleniti nam non
            ipsam voluptatibus quo rerum incidunt unde ullam doloremque
            perspiciatis. Commodi! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint fugiat vel eligendi accusantium obcaecati
            adipisci voluptas tempore, tenetur enim facilis officiis mollitia at
            hic delectus!
          </div>
        </TabContent>
        <TabContent :tab-index="1">
          <div class="bg-secondary rounded-md p-xs">
            Tab 1: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Corrupti, asperiores neque. Neque consectetur delectus ut in
            molestias, distinctio praesentium similique voluptas quasi numquam
            excepturi hic omnis necessitatibus debitis, a porro repellendus
            cumque eos voluptatum maiores nostrum eveniet! Deleniti nam non
            ipsam voluptatibus quo rerum incidunt unde ullam doloremque
            perspiciatis. Commodi!
          </div>
        </TabContent>
        <TabContent :tab-index="2">
          <div class="bg-success text-light-3 rounded-md p-xs">
            Tab 2: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Corrupti, asperiores neque. Neque consectetur delectus ut in
            molestias, distinctio praesentium similique voluptas quasi numquam
            excepturi hic omnis necessitatibus debitis, a porro repellendus
            cumque eos voluptatum maiores nostrum eveniet! Deleniti nam non
            ipsam voluptatibus quo rerum incidunt unde ullam doloremque
            perspiciatis. Commodi! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint fugiat vel eligendi accusantium obcaecati
            adipisci voluptas tempore, tenetur enim facilis officiis mollitia at
            hic delectus!
          </div>
        </TabContent>
        <TabContent :tab-index="3">
          <div class="bg-info text-light-3 rounded-md p-xs">
            Tab 3: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Corrupti, asperiores neque. Neque consectetur delectus ut in
            molestias, distinctio praesentium similique voluptas quasi numquam
            excepturi hic omnis necessitatibus debitis, a porro repellendus
            cumque eos voluptatum maiores nostrum eveniet! Deleniti nam non
            ipsam voluptatibus quo rerum incidunt unde ullam doloremque
            perspiciatis. Commodi!
          </div>
        </TabContent>
      </template>
    </TabContainer>
  </div>
</template>

<style scoped></style>
