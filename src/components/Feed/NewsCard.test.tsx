import { render, screen, fireEvent } from '@testing-library/react';
import NewsCard from '@/components/Feed/NewsCard';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const article = {
  title: 'Test News',
  description: 'Test description',
  url: 'https://example.com',
  urlToImage: '',
};

test('renders news title and description', () => {
  render(
    <Provider store={store}>
      <NewsCard article={article} />
    </Provider>
  );

  expect(screen.getByText(/Test News/)).toBeInTheDocument();
  expect(screen.getByText(/Test description/)).toBeInTheDocument();
});
