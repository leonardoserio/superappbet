module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/design-system': './src/design-system',
          '@/hooks': './src/hooks',
          '@/modules': './src/modules',
          '@/navigation': './src/navigation',
          '@/screens': './src/screens',
          '@/services': './src/services',
          '@/types': './src/types',
          '@/utils': './src/utils',
        },
      },
    ],
  ],
};
