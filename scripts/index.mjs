import fs from 'fs'
import inquirer from 'inquirer'
import lodash from 'lodash'
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
  const currentYear = new Date().getFullYear().toString()

  const licenseTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_license.md`), {
      encoding: 'utf8',
    })
    .replace(/{%current-year%}/gi, currentYear)
    .replace(/{%author-name%}/gi, authorName)
  console.log('Created license file')

  const packageTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_package.md`), {
      encoding: 'utf8',
    })
    .replace(/{%packageName%}/gi, `@bobbykim/${directoryName}`)
    .replace(/{%fileName%}/gi, directoryName)
    .replace(/{%authorName%}/gi, authorName)
    .replace(/{%workspace%}/gi, 'workspace:*')

  console.log('Created package.json file')

  const tsConfigTemplate = fs.readFileSync(
    path.resolve(`${TEMPLATE_PATH}/_tsconfig.md`),
    {
      encoding: 'utf8',
    }
  )
  console.log('Created tsconfig.json file')
  const tsconfigNodeTemplate = fs.readFileSync(
    path.resolve(TEMPLATE_PATH, '_tsconfig.node.md'),
    {
      encoding: 'utf8',
    }
  )
  console.log('Created tsconfig.node.json file')

  const readmeTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_readme.md`), {
      encoding: 'utf8',
    })
    .replace(/{%componentName%}/gi, `@bobbykim/${directoryName}`)
    .replace(/{%authorName%}/gi, authorName)

  console.log('created readme file')

  const storyTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_story.md`), {
      encoding: 'utf8',
    })
    .replace(/{%componentDir%}/gi, directoryName)

  console.log('Created story template')

  const storyMdxTemplate = fs.readFileSync(
    path.resolve(`${TEMPLATE_PATH}/_story.mdx.md`),
    {
      encoding: 'utf8',
    }
  )
  console.log('created mdx template')

  const indexTemplate = fs
    .readFileSync(path.resolve(`${TEMPLATE_PATH}/_index.md`), {
      encoding: 'utf8',
    })
    .replace(/{%componentName%}/gi, directoryName)

  console.log('Created index file')

  const viteConfigTemplate = fs
    .readFileSync(path.resolve(TEMPLATE_PATH, '_vite.config.md'), {
      encoding: 'utf8',
    })
    .replace(/{%fileName%}/gi, directoryName)
    .replace(/{%packageName}/gi, componentName)
    .replace(/{%dirname%}/gi, '__dirname')

  console.log('Created vite.config.ts file')

  const viteEnvTemplate = fs.readFileSync(
    path.resolve(TEMPLATE_PATH, '_vite-env.d.md'),
    {
      encoding: 'utf8',
    }
  )
  console.log('Created vite-env.d.ts file')

  fs.mkdir(`${COMPONENTS_PATH}/${directoryName}`, (error) => {
    if (error) {
      console.log('Failed to create component..')
      console.log(error)
      return
    } else {
      // create lib path inside component directory
      fs.mkdir(`${COMPONENTS_PATH}/${directoryName}/lib`, (error) => {
        if (error) {
          console.log('failed to create lib folder inside component directory')
          console.log(error)
        }
      })
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
                ].toLowerCase()}/${directoryName}/${componentName}.stories.ts`,
                storyTemplate
              )
              // create story mdx file
              fs.writeFileSync(
                `${STORIES_PATH}/${answers[
                  'component_type'
                ].toLowerCase()}/${directoryName}/${componentName}.mdx`,
                storyMdxTemplate
              )
            }
          }
        )
      }
      // create index file
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/lib/index.ts`,
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
      // create tsconfig files
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/tsconfig.json`,
        tsConfigTemplate
      )
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/tsconfig.node.json`,
        tsconfigNodeTemplate
      )
      // create vite.config file
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/vite.config.ts`,
        viteConfigTemplate
      )
      // create vite-env file
      fs.writeFileSync(
        `${COMPONENTS_PATH}/${directoryName}/lib/vite-env.d.ts`,
        viteEnvTemplate
      )
    }
  })
})
