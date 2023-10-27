const plugin = require('tailwindcss/plugin')

const mclTheme = plugin.withOptions(
  () => {
    return ({ addBase, theme, addComponents, addUtilities, e }) => {
      const colors = theme('colors')
      const listColors = Object.keys(colors).reduce((accumulator, key) => {
        if (typeof colors[key] === 'string') {
          return {
            ...accumulator,
            [`.mcl-list-${e(key)} li::before`]: {
              color: colors[key],
            },
          }
        }
        const colorShades = Object.keys(colors[key])

        return {
          ...accumulator,
          ...colorShades.reduce(
            (acc, level) => ({
              ...acc,
              [`.mcl-list-${e(key)}-${level} li::before`]: {
                color: colors[key][level],
              },
            }),
            {}
          ),
        }
      }, {})
      const linkColors = Object.keys(colors).reduce((accumulator, key) => {
        const invalidKeys = ['current', 'transparent', 'inherit']
        if (invalidKeys.includes(key)) {
          return
        }
        if (typeof colors[key] === 'string') {
          return {
            ...accumulator,
            [`.mcl-link.text-${e(key)}`]: {
              '&:hover': {
                [`@apply text-${key}/60`]: {},
              },
            },
          }
        }
        const colorShades = Object.keys(colors[key])
        return {
          ...accumulator,
          ...colorShades.reduce((acc, level) => ({
            ...acc,
            [`.mcl-link.text-${e(key)}-${level}`]: {
              '&:hover': {
                [`@apply text-${key}-${level}/60`]: {},
              },
            },
          })),
        }
      })
      const btnColors = Object.keys(colors).reduce((accumulator, key) => {
        if (typeof colors[key] === 'string') {
          return {
            ...accumulator,
            [`.btn.btn-${e(key)}`]: {
              [`@apply bg-${key}`]: {},
              '&:hover': {
                '@apply bg-opacity-70': {},
              },
              '&:focus': {
                [`@apply ring-4 ring-${key}`]: {},
              },
            },
            [`.btn.btn-invert.btn-${e(key)}`]: {
              [`@apply border-2 bg-transparent border-${key} text-${key}`]: {},
              '&:hover': {
                [`@apply bg-${key} text-white bg-opacity-100`]: {},
              },
              '&:focus': {
                [`@apply bg-${key} text-white`]: {},
              },
            },
            [`.btn-group .btn.btn-${e(key)}`]: {
              '&:focus': {
                '@apply ring-0': {},
              },
            },
            [`.btn.btn-${e(key)}.btn-no-ring`]: {
              '&:focus': {
                '@apply ring-0': {},
              },
            },
            [`.btn.btn-progress.btn-${e(key)}`]: {
              [`@apply before:bg-${key} border-${key} text-${key} bg-transparent`]:
                {},
              '&:hover, &:focus': {
                '@apply text-white': {},
              },
            },
          }
        }

        const colorShades = Object.keys(colors[key])

        return {
          ...accumulator,
          ...colorShades.reduce(
            (acc, level) => ({
              ...acc,
              [`.btn.btn-${e(key)}-${level}`]: {
                [`@apply bg-${key}-${level}`]: {},
                '&:hover': {
                  '@apply bg-opacity-70': {},
                },
                '&:focus': {
                  [`@apply ring-4 ring-${key}-${level}`]: {},
                },
              },
              [`.btn.btn-invert.btn-${e(key)}-${level}`]: {
                [`@apply border-2 bg-white border-${key}-${level} text-${key}-${level}`]:
                  {},
                '&:hover': {
                  [`@apply bg-${key}-${level} text-white bg-opacity-100`]: {},
                },
                '&:focus': {
                  [`@apply bg-${key}-${level} text-white`]: {},
                },
              },
              [`.btn-group .btn.btn-${e(key)}-${level}`]: {
                '&:focus': {
                  '@apply ring-0': {},
                },
              },
              [`.btn.btn-progress.btn-${e(key)}-${level}`]: {
                [`@apply before:bg-${key}-${level} border-${key}-${level} text-${key}-${level} bg-transparent`]:
                  {},
                '&:hover, &:focus': {
                  '@apply text-white': {},
                },
              },
            }),
            {}
          ),
        }
      }, {})
      const tooltipColors = Object.keys(colors).reduce((accumulator, key) => {
        // const invalidKeys = ['current', 'transparent', 'inherit']
        // if (invalidKeys.includes(key)) {
        //   return
        // }
        if (typeof colors[key] === 'string') {
          return {
            ...accumulator,
            [`.tooltip.tooltip-top.bg-${e(key)}`]: {
              [`@apply after:border-t-${key}`]: {},
            },
            [`.tooltip.tooltip-bottom.bg-${e(key)}`]: {
              [`@apply after:border-b-${key}`]: {},
            },
            [`.tooltip.tooltip-right.bg-${e(key)}`]: {
              [`@apply after:border-r-${key}`]: {},
            },
            [`.tooltip.tooltip-left.bg-${e(key)}`]: {
              [`@apply after:border-l-${key}`]: {},
            },
          }
        }
        const colorShades = Object.keys(colors[key])
        return {
          ...accumulator,
          ...colorShades.reduce((acc, level) => ({
            ...acc,
            [`.tooltip.tooltip-top.bg-${e(key)}-${level}`]: {
              [`@apply after:border-t-${key}-${level}`]: {},
            },
            [`.tooltip.tooltip-bottom.bg-${e(key)}-${level}`]: {
              [`@apply after:border-b-${key}-${level}`]: {},
            },
            [`.tooltip.tooltip-right.bg-${e(key)}-${level}`]: {
              [`@apply after:border-r-${key}-${level}`]: {},
            },
            [`.tooltip.tooltip-left.bg-${e(key)}-${level}`]: {
              [`@apply after:border-l-${key}-${level}`]: {},
            },
          })),
        }
      }, {})

      addBase({
        body: {
          // default font size
          fontSize: '1rem',
          lineHeight: '1.5',
        },
        h1: {
          // default medium size
          fontSize: '30px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '30px' },
          '@screen lg': { fontSize: '48px' },
        },
        h2: {
          // default medium size
          fontSize: '24px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '24px' },
          '@screen lg': { fontSize: '36px' },
        },
        h3: {
          // default medium size
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '18px' },
          '@screen lg': { fontSize: '20px' },
        },
        h4: {
          // default medium size
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '16px' },
          '@screen lg': { fontSize: '18px' },
        },
      })

      addComponents({
        '.h1-sm': {
          fontSize: '24px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '24px' },
          '@screen lg': { fontSize: '36px' },
        },
        '.h1-md': {
          fontSize: '30px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '30px' },
          '@screen lg': { fontSize: '48px' },
        },
        '.h1-lg': {
          fontSize: '36px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '36px' },
          '@screen lg': { fontSize: '56px' },
        },
        '.h1-xl': {
          fontSize: '56px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '56px' },
          '@screen lg': { fontSize: '72px' },
        },
        '.h2-sm': {
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '18px' },
          '@screen lg': { fontSize: '24px' },
        },
        '.h2-md': {
          fontSize: '24px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '24px' },
          '@screen lg': { fontSize: '36px' },
        },
        '.h2-lg': {
          fontSize: '30px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '30px' },
          '@screen lg': { fontSize: '48px' },
        },
        '.h2-xl': {
          fontSize: '48px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '48px' },
          '@screen lg': { fontSize: '60px' },
        },
        '.h3-sm': {
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '16px' },
          '@screen lg': { fontSize: '16px' },
        },
        '.h3-md': {
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '18px' },
          '@screen lg': { fontSize: '20px' },
        },
        '.h3-lg': {
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '18px' },
          '@screen lg': { fontSize: '24px' },
        },
        '.h3-xl': {
          fontSize: '30px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '30px' },
          '@screen lg': { fontSize: '36px' },
        },
        'h4-sm': {
          fontSize: '14px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '14px' },
          '@screen lg': { fontSize: '16px' },
        },
        'h4-md': {
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '16px' },
          '@screen lg': { fontSize: '18px' },
        },
        'h4-lg': {
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '16px' },
          '@screen lg': { fontSize: '20px' },
        },
        'h4-xl': {
          fontSize: '24px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen  md': { fontSize: '24px' },
          '@screen lg': { fontSize: '30px' },
        },
        '.mcl-link': {
          color: theme('colors.primary'),
          textDecoration: 'underline',
          '@apply transition-colors duration-200 ease-in': {},
          '&:hover': {
            '@apply text-primary/60': {},
          },
        },
        '.mcl-list': {
          'list-style-position': 'inside',
          padding: 0,
          'margin-left': '1rem',
        },
        'ul .mcl-list': {
          'list-style': 'none',
        },
        '.mcl-list li': {
          'margin-bottom': '0.5rem',
        },
        '.mcl-list li::before': {
          content: '"•"',
          'font-weight': '700',
          display: 'inline-block',
          width: '1rem',
          'margin-left': '-1rem',
        },
        '.mcl-list.mcl-list-sm li::before': {
          'font-weight': '500',
        },
        '.mcl-list.mcl-list-lg li::before': {
          'font-weight': '900',
        },
        '.btn': {
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          'font-size': '1rem',
          transition: 'all 300ms linear',
          overflow: 'hidden',
          display: 'inline-block',
          'font-weight': 'bold',
          '@apply outline-none ring-offset-white ring-offset-2 bg-primary text-center rounded':
            {},
          '&:hover': {
            '@apply bg-opacity-70': {},
          },
          '&:focus': {
            '@apply ring-4 ring-primary': {},
          },
        },
        '.btn.btn-round': {
          '@apply rounded-full': {},
        },
        '.btn.btn-full': {
          display: 'block',
          width: '100%',
        },
        '.btn.btn-sm': {
          padding: '0.25rem 0.5rem',
          'font-size': '0.875rem',
        },
        '.btn.btn-lg': {
          padding: '0.625rem 1.25rem',
          'font-size': '1.125rem',
        },
        '.btn-group': {
          '@apply flex rounded overflow-hidden': {},
        },
        '.btn-group .btn': {
          '@apply rounded-none ring-offset-0': {},

          '&:focus': {
            '@apply ring-0': {},
          },
        },
        '.btn.btn-no-ring': {
          '@apply ring-offset-0': {},
          '&:focus': {
            '@apply ring-0': {},
          },
        },
        '.btn.btn-invert': {
          '@apply border-2 border-primary text-primary bg-white': {},
          '&:hover': {
            '@apply bg-primary text-white bg-opacity-100': {},
          },
        },
        '.btn.btn-progress': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            height: '100%',
            width: '0',
            bottom: '0',
            left: '0',
            transition: 'width 300ms linear',
          },
          '@apply before:bg-primary border-2 border-primary text-primary bg-transparent':
            {},
        },
        '.btn.btn-progress > *': {
          position: 'relative',
        },
        '.btn.btn-progress.btn-progress-r': {
          '&::before': {
            left: '100%',
            transition: 'all 300ms linear',
          },
        },
        '.btn.btn-progress:hover, .btn.btn-progress:focus': {
          '@apply text-white': {},
          '&::before': {
            width: '100%',
          },
        },
        '.btn.btn-progress.btn-progress-r:hover, .btn.btn-progress.btn-progress-r:focus':
          {
            '&::before': {
              width: '100%',
              left: '0',
            },
          },
        '.tooltip': {
          '@apply font-normal text-sm transition-opacity duration-200 p-2xs absolute rounded text-center drop-shadow-md':
            {},
        },
        '.tooltip.tooltip-top': {
          left: '50%',
          bottom: '110%',
          transform: 'translateX(-50%)',
          '&::after': {
            content: '" "',
            position: 'absolute',
            top: '100%',
            left: '50%',
            'margin-left': '-5px',
            'border-width': '5px',
            'border-style': 'solid',
          },
          '@apply after:border-t-dark-3 after:border-x-transparent after:border-b-transparent':
            {},
        },
        '.tooltip.tooltip-bottom': {
          left: '50%',
          top: '110%',
          transform: 'translateX(-50%)',
          '&::after': {
            content: '" "',
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            'margin-left': '-5px',
            'border-width': '5px',
            'border-style': 'solid',
          },
          '@apply after:border-t-transparent after:border-x-transparent after:border-b-dark-3':
            {},
        },
        '.tooltip.tooltip-left': {
          top: '50%',
          right: '110%',
          transform: 'translateY(-50%)',
          '&::after': {
            content: '" "',
            position: 'absolute',
            top: '50%',
            left: '100%',
            'margin-top': '-5px',
            'border-width': '5px',
            'border-style': 'solid',
          },
          '@apply after:border-y-transparent after:border-r-transparent after:border-l-dark-3':
            {},
        },
        '.tooltip.tooltip-right': {
          top: '50%',
          left: '110%',
          transform: 'translateY(-50%)',
          '&::after': {
            content: '" "',
            position: 'absolute',
            top: '50%',
            right: '100%',
            'margin-top': '-5px',
            'border-width': '5px',
            'border-style': 'solid',
          },
          '@apply after:border-y-transparent after:border-l-transparent after:border-r-dark-3':
            {},
        },
      })

      addUtilities(listColors)
      addUtilities(btnColors)
      addUtilities(linkColors)
      addUtilities(tooltipColors)
    }
  },
  (options = {}) => {
    const colorsList = {
      primary: '#ec489a',
      secondary: '#00feda',
      success: '#78be20',
      info: '#00a3e0',
      warning: '#f1ac18',
      danger: '#cc2f2f',
      'light-1': '#fafafa',
      'light-2': '#f1f1f1',
      'light-3': '#e8e8e8',
      'light-4': '#d0d0d0',
      'dark-1': '#747474',
      'dark-2': '#484848',
      'dark-3': '#1f2937',
      'dark-4': '#191919',
    }

    const spacingList = {
      '3xs': '4px',
      '2xs': '8px',
      xs: '16px',
      sm: '24px',
      md: '32px',
      lg: '48px',
      xl: '64px',
      '2xl': '96px',
      '3xl': '128px',
    }

    Object.keys(colorsList).forEach((key) => {
      if (options.colors !== undefined && options.colors[key] !== undefined) {
        colorsList[key] = options.colors[key]
      }
    })
    Object.keys(spacingList).forEach((key) => {
      if (options.spacing !== undefined && options.spacing[key] !== undefined) {
        spacingList[key] = options.spacing[key]
      }
    })
    return {
      theme: {
        fontSize: {
          xs: '12px',
          sm: '14px',
          md: '16px',
          lg: '18px',
          xl: '20px',
        },
        container: {
          center: true,
          screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
          },
        },
        extend: {
          colors: colorsList,
          spacing: spacingList,
        },
      },
    }
  }
)

module.exports = {
  mclTheme: mclTheme,
}
