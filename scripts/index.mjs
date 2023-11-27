// const inquirer = require('inquirer')
// const { camelCase, upperFirst, kebabCase } = require('lodash')
// const fs = require('fs')
// const path = require('path')

import inquirer from 'inquirer'
import lodash from 'lodash'
import fs from 'fs'
import path from 'path'

const { camelCase, upperFirst, kebabCase } = lodash

// Base paths
const TEMPLATE_PATH = './scripts/templates'
const COMPONENTS_PATH = './src/components'
const STORIES_PATH = './src/stories'

const componentTypes = ['Components', 'Sections']

const questions = [
  {
    type: 'input',
    name: 'component_name',
    message: 'Please enter the component name',
    validate: (value) => {
      if (value === '') {
        return 'Component name cannot be blank'
      }

      // Check if component with same name exists
      const existingCompList = fs.readdirSync('./src/components')
      const compName = kebabCase(value)

      const nameCheckResult = existingCompList.filter((comp) => {
        return comp === compName
      })

      if (nameCheckResult.leng > 0) {
        return `Component with '${value}' name alreadt exists, please use other name`
      }

      return true
    },
  },
  {
    type: 'list',
    name: 'component_type',
    message: 'Please select the component type',
    choices: componentTypes,
  },
  {
    type: 'confirm',
    name: 'create_story',
    message: 'Do you want to create story directory?',
  },
  {
    type: 'input',
    name: 'author_name',
    message: 'Please enter your name',
    validate: (value) => {
      if (value === '') {
        return 'Author name cannot be blank'
      }
      return true
    },
  },
]

inquirer.prompt(questions).then((answers) => {
  const camelCaseText = camelCase(answers['component_name'])
  const componentName = upperFirst(camelCaseText)
  const directoryName = kebabCase(answers['component_name'])
  const authorName = upperFirst(answers['author_name'])
  const storyConfirm = answers['create_story']

  const storyName = directoryName.replace(/-/gi, '')

  const compTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_component.md`), {
      encoding: 'utf8',
    })
    .replace(/{%componentName%}/gi, componentName)

  const licenseTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_license.md`), {
      encoding: 'utf8',
    })
    .replace(/{%author-name%}/gi, authorName)

  const packageTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_package.md`), {
      encoding: 'utf8',
    })
    .replace(/{%componentName%}/gi, `@bobbykim/${directoryName}`)
    .replace(/{%authorName%}/gi, authorName)

  const tsConfigTemplate = fs.readFileSync(
    path.resolve(`${TEMPLATE_PATH}/_tsconfig.md`, {
      encoding: 'utf8',
    })
  )

  const readmeTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_readme.md`), {
      encoding: 'utf8',
    })
    .replace(/{%vueFileName%}/gi, componentName)
    .replace(/{%componentName%}/gi, `@bobbykim/${directoryName}`)
    .replace(/{%authorName%}/gi, authorName)

  const storyTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_story.md`), {
      encoding: 'utf8',
    })
    .replace(/{%componentName%}/gi, componentName)
    .replace(/{%componentDir%}/gi, directoryName)

  const indexTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_index.md`), {
      encoding: 'utf8',
    })
    .replace(/{%componentName%}/gi, componentName)

  fs.mkdir(`${COMPONENTS_PATH}/${directoryName}`, (error) => {
    if (error) {
      console.log('Failed to create component..')
      console.log(error)
      return
    } else {
      if (storyConfirm) {
        fs.mkdir(
          `${STORIES_PATH}/${answers[
            'component_type'
          ].toLowerCase()}/${directoryName}`,
          (error) => {
            if (error) {
              console.log('Failed to create story...')
              return
            } else {
              // create story file
              fs.writeFileSync(
                `${STORIES_PATH}/${answers[
                  'component_type'
                ].toLowerCase()}/${directoryName}/${componentName}.story.vue`,
                storyTemplate
              )
            }
          }
        )
      }
      // create component file
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/${componentName}.vue`,
        compTemplate
      )

      // create index file
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/index.ts`,
        indexTemplate
      )

      // create LICENSE.md file
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/LICENSE.md`,
        licenseTemplate
      )

      // create package.json file
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/package.json`,
        JSON.parse(JSON.stringify(packageTemplate))
      )

      // create README.md file
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/README.md`,
        readmeTemplate
      )
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/tsconfig.json`,
        tsConfigTemplate
      )
    }
  })
})
