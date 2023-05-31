<script setup lang="ts"></script>

<template>
  <Story title="Utility Class" group="design-system">
    <!-- button class -->
    <Variant title="Button Class">
      <div
        class="grid grid-cols-3 gap-6 justify-items-center content-center mb-2xs bg-white py-sm px-xs md:py-md md:px-sm"
      >
        <div class="col-span-3">
          <h3>Button colors</h3>
        </div>
        <div class="place-self-center">
          <button class="btn">Default</button>
        </div>
        <div class="place-self-center">
          <button class="btn btn-secondary">Secondary</button>
        </div>
        <div class="place-self-center">
          <button class="btn btn-success">Success</button>
        </div>
        <div class="col-span-3">
          <h3>Button Size</h3>
        </div>
        <div class="place-self-center">
          <button class="btn btn-info text-white">Default</button>
        </div>
        <div class="place-self-center">
          <button class="btn btn-sm btn-light-4">Small</button>
        </div>
        <div class="place-self-center">
          <button class="btn btn-lg btn-warning">Large</button>
        </div>
        <div class="col-span-3">
          <h3>Button Corner</h3>
        </div>
        <div class="place-self-center">
          <button class="btn btn-success">Default</button>
        </div>
        <div class="place-self-center">
          <button class="btn btn-round btn-secondary">Round</button>
        </div>
        <div class="col-span-3">
          <h3>Button Width</h3>
        </div>
        <div class="place-self-center">
          <button class="btn">Default</button>
        </div>
        <div class="col-span-2 justify-self-stretch place-self-center">
          <button class="btn btn-full btn-warning">Full width</button>
        </div>
        <div class="col-span-3">
          <h3>Inverted</h3>
        </div>
        <div class="place-self-center">
          <button class="btn btn-invert">Default</button>
        </div>
        <div class="place-self-center">
          <button class="btn btn-invert btn-secondary">Secondary</button>
        </div>
        <div class="place-self-center">
          <button class="btn btn-invert btn-success btn-round">Rounded</button>
        </div>
        <div class="place-self-center">
          <button class="btn btn-invert btn-warning btn-sm">Small</button>
        </div>
        <div class="place-self-center">
          <button class="btn btn-invert btn-success btn-lg">Large</button>
        </div>
        <div class="col-span-3 justify-self-stretch place-self-center">
          <button class="btn btn-full btn-invert btn-dark-2">Full width</button>
        </div>
        <div class="col-span-3">
          <h3>Button group</h3>
        </div>
        <div class="col-span-3 place-self-center">
          <div class="btn-group">
            <button class="btn">Button 1</button>
            <button class="btn btn-secondary">Button 2</button>
            <button class="btn btn-warning">Button 3</button>
            <button class="btn btn-danger btn-invert">Button 4</button>
          </div>
        </div>
      </div>
    </Variant>
    <!-- List class -->
    <Variant title="List class">
      <div class="mb-2xs bg-white py-sm px-xs md:py-md md:px-sm">
        <div class="mb-sm">
          <div>Default</div>
          <ul class="mcl-list">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              sapiente repudiandae ullam? Voluptas esse rerum quaerat adipisci
              ratione sit exercitationem architecto quas id? Consectetur saepe
              officiis illum, totam enim repellendus dignissimos deleniti ipsam
              adipisci qui placeat ab quo obcaecati distinctio sequi. Ad sed
              dolor quam assumenda explicabo incidunt. Officiis, molestias.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              alias nostrum quae architecto minima? Maxime molestiae sit vitae a
              nisi dolor, unde iusto cumque, veritatis odio error? Qui, aut.
              Necessitatibus ut omnis molestiae dolorem minus id, reprehenderit,
              adipisci voluptatem quae in earum blanditiis provident mollitia
              quia fugiat neque! Maxime, eaque.
            </li>
          </ul>
        </div>
        <div class="mb-sm">
          <div class="text-primary">Primary</div>
          <ul class="mcl-list mcl-list-primary">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              sapiente repudiandae ullam? Voluptas esse rerum quaerat adipisci
              ratione sit exercitationem architecto quas id? Consectetur saepe
              officiis illum, totam enim repellendus dignissimos deleniti ipsam
              adipisci qui placeat ab quo obcaecati distinctio sequi. Ad sed
              dolor quam assumenda explicabo incidunt. Officiis, molestias.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              alias nostrum quae architecto minima? Maxime molestiae sit vitae a
              nisi dolor, unde iusto cumque, veritatis odio error? Qui, aut.
              Necessitatibus ut omnis molestiae dolorem minus id, reprehenderit,
              adipisci voluptatem quae in earum blanditiis provident mollitia
              quia fugiat neque! Maxime, eaque.
            </li>
          </ul>
        </div>
        <div class="mb-sm">
          <div class="text-secondary">Secondary</div>
          <ul class="mcl-list mcl-list-secondary">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              sapiente repudiandae ullam? Voluptas esse rerum quaerat adipisci
              ratione sit exercitationem architecto quas id? Consectetur saepe
              officiis illum, totam enim repellendus dignissimos deleniti ipsam
              adipisci qui placeat ab quo obcaecati distinctio sequi. Ad sed
              dolor quam assumenda explicabo incidunt. Officiis, molestias.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              alias nostrum quae architecto minima? Maxime molestiae sit vitae a
              nisi dolor, unde iusto cumque, veritatis odio error? Qui, aut.
              Necessitatibus ut omnis molestiae dolorem minus id, reprehenderit,
              adipisci voluptatem quae in earum blanditiis provident mollitia
              quia fugiat neque! Maxime, eaque.
            </li>
          </ul>
        </div>
        <div class="mb-sm">
          <div class="text-success">Success</div>
          <ul class="mcl-list mcl-list-success">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              sapiente repudiandae ullam? Voluptas esse rerum quaerat adipisci
              ratione sit exercitationem architecto quas id? Consectetur saepe
              officiis illum, totam enim repellendus dignissimos deleniti ipsam
              adipisci qui placeat ab quo obcaecati distinctio sequi. Ad sed
              dolor quam assumenda explicabo incidunt. Officiis, molestias.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              alias nostrum quae architecto minima? Maxime molestiae sit vitae a
              nisi dolor, unde iusto cumque, veritatis odio error? Qui, aut.
              Necessitatibus ut omnis molestiae dolorem minus id, reprehenderit,
              adipisci voluptatem quae in earum blanditiis provident mollitia
              quia fugiat neque! Maxime, eaque.
            </li>
          </ul>
        </div>
        <div class="mb-sm">
          <div class="text-warning">Warning</div>
          <ul class="mcl-list mcl-list-warning">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              sapiente repudiandae ullam? Voluptas esse rerum quaerat adipisci
              ratione sit exercitationem architecto quas id? Consectetur saepe
              officiis illum, totam enim repellendus dignissimos deleniti ipsam
              adipisci qui placeat ab quo obcaecati distinctio sequi. Ad sed
              dolor quam assumenda explicabo incidunt. Officiis, molestias.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              alias nostrum quae architecto minima? Maxime molestiae sit vitae a
              nisi dolor, unde iusto cumque, veritatis odio error? Qui, aut.
              Necessitatibus ut omnis molestiae dolorem minus id, reprehenderit,
              adipisci voluptatem quae in earum blanditiis provident mollitia
              quia fugiat neque! Maxime, eaque.
            </li>
          </ul>
        </div>
      </div>
    </Variant>
  </Story>
</template>
