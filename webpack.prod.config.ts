import path from 'path';

interface ProductionConfiguration {
  mode: 'none' | 'development' | 'production';
  devServer: {
    open: boolean;
    host: 'localhost';
    contentBase: string;
  };
}

export const productionConfig: ProductionConfiguration = {
  mode: 'production',
  devServer: {
    open: true,
    host: 'localhost',
    contentBase: path.resolve(__dirname, '../dist'),
  },
};