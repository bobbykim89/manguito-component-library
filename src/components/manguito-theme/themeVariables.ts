import plugin from 'tailwindcss/plugin'

interface ColorInput {
  primary?: string
  secondary?: string
  success?: string
  info?: string
  warning?: string
  danger?: string
  'light-1'?: string
  'light-2'?: string
  'light-3'?: string
  'light-4'?: string
  'dark-1'?: string
  'dark-2'?: string
  'dark-3'?: string
  'dark-4'?: string
}

interface SpacingInput {
  '3xs'?: string
  '2xs'?: string
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
  '3xl'?: string
}

interface MCLInputType {
  colors?: ColorInput
  spacing?: SpacingInput
}

export const mclTheme = plugin.withOptions(
  () => {
    return ({ addBase, theme, addComponents }) => {
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
        },
      })
    }
  },
  (options: MCLInputType = {}) => {
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
