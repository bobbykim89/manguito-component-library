{
"name": "{%componentName%}",
"version": "0.1.0",
"description": "",
"type": "module",
"main": "index.ts",
"scripts": {
"build": "vue-tsc --project tsconfig.vue.json && tsc"
},
"author": {
"name": "{%authorName%}",
"url": "https://www.devbobbykim.com/"
},
"homepage": "https://manguito-component-library.vercel.app/",
"repository": {
"type": "git",
"url": "https://github.com/bobbykim89/manguito-component-library.git"
},
"publishConfig": {
"access": "public"
},
"license": "MIT",
"dependencies": {
"@bobbykim/manguito-theme": "^{%packageVersion%}"
}
}
