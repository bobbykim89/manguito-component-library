# @bobbykim/mcl-forms

## Demo

[MCL Storybook Page](https://manguito-component-library.vercel.app/)

- [MCL Form Group](https://manguito-component-library.vercel.app/?path=/docs/components-form-mclformgroup--mclformgroup)
- [MCL Input File](https://manguito-component-library.vercel.app/?path=/docs/components-form-mclinputfile--mclinputfile)
- [MCL Input Radio](https://manguito-component-library.vercel.app/?path=/docs/components-form-mclinputradio--mclinputradio)
- [MCL Input Switch](https://manguito-component-library.vercel.app/?path=/docs/components-form-mclinputswitch--mclinputswitch)
- [MCL Input Text](https://manguito-component-library.vercel.app/?path=/docs/components-form-mclinputtext--mclinputtext)
- [MCL Select](https://manguito-component-library.vercel.app/?path=/docs/components-form-mclselect--mclselect)
- [MCL Text Area](https://manguito-component-library.vercel.app/?path=/docs/components-form-mcltextarea--mcltextarea)

## Install

```sh
npm i @bobbykim/mcl-forms
```

## Usage

`import { MclFormGroup, MclInputFile, MclInputRadio, MclInputSwitch, MclInputText, MclSelect, MclTextArea } from "@bobbykim/mcl-forms"`;

```vue
<script setup lang="ts">
...
import { MclFormGroup, MclInputFile, MclInputRadio, MclInputSwitch, MclInputText, MclSelect, MclTextArea } from "@bobbykim/mcl-forms"
...
</script>

<template>
  <form-group>
    <mcl-input-file></mcl-input-file>
  </form-group>
  <form-group>
    <mcl-input-radio></mcl-input-radio>
  </form-group>
  <form-group>
    <mcl-input-switch></mcl-input-switch>
  </form-group>
  <form-group>
    <mcl-input-text></mcl-input-text>
  </form-group>
  <form-group>
    <mcl-input-select></mcl-input-select>
  </form-group>
  <form-group>
    <mcl-text-area></mcl-text-area>
  </form-group>
</template>
```

## Dependencies

- @bobbykim/manguito-theme

## Maintainer

- **Bobby Kim** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
