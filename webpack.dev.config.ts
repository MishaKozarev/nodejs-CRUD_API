interface DevelopmentConfiguration {
  mode: 'none' | 'development' | 'production';
}

export const devConfig: DevelopmentConfiguration = {
  mode: 'development',
};