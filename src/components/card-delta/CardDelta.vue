<script setup lang="ts">
const props = withDefaults(defineProps<{}>(), {})
</script>

<template>
  <div class="card overflow-hidden rounded-md max-w-[450px] sm:max-w-[350px]">
    <div class="flex flex-col rounded-md overflow-hidden">
      <img
        src="https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg"
        class="object-cover object-top max-h-[250px]"
        alt=""
      />
      <div class="p-xs bg-white h-[300px]">card-delta</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  --border-size: 3px;
  --border-angle: 0turn;
  background-image: conic-gradient(
    from var(--border-angle),
    #e8e8e8 20%,
    #08f,
    #f03
  );
  // background-size: calc(100% - (var(--border-size) * 2))
  //     calc(100% - (var(--border-size) * 2)),
  //   cover;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: var(--border-size);

  animation: bg-spin 3s linear infinite;
  @keyframes bg-spin {
    to {
      --border-angle: 1turn;
    }
  }

  &:hover {
    animation-play-state: paused;
  }
}
.card-image {
  // margin: var(--border-size);
  // width: calc(100% - (var(--border-size) * 2));
}

@property --border-angle {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0turn;
}
</style>
