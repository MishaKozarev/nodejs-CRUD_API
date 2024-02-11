interface ProductionConfiguration {
  mode: 'none' | 'development' | 'production';
}

export const prodConfig: ProductionConfiguration = {
  mode: 'production',
};