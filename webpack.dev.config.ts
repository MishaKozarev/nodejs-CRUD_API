import path from 'path';

interface DevelopmentConfiguration {
  mode: 'none' | 'development' | 'production';
  devtool: string;
  devServer: {
    open: boolean,
    host: 'localhost',
    contentBase: string;
  };
  watch: boolean;
}

export const developmentConfig: DevelopmentConfiguration = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    host: 'localhost',
    contentBase: path.resolve(__dirname, './'),
  },
  watch: true,
};