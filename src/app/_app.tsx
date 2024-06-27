import MyApp from '@/app/MyApp';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function App({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <MyApp Component={Component} pageProps={pageProps} />
    </Provider>
  );
}
