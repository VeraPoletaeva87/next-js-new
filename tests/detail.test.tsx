import { render, screen, waitFor } from '@testing-library/react';
import {
  Mock,
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import Detail from '../components/detail';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

const mockData = [
  {
    name: 'name1',
    description: 'description1',
    tagline: 'tagline1',
  },
];

vi.mock('next/router', () => require('next-router-mock'));

const contextValue = {
    searchString: '',
    setSearchString: vi.fn(),
    items: mockData,
    setItems: vi.fn(),
};

vi.mock('react', async () => {
    const react = await vi.importActual<typeof import('react')>('react');
    return {
      ...react,
      useContext: vi.fn(),
    };
  });

describe('Detail', () => {
  it('clicking the close button hides the component', async () => {
    render(
        <Provider store={store}>
          <Detail item={mockData[0]}/>
        </Provider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('detail-close-button')).toBeInTheDocument()
    );
    await userEvent.click(screen.getByTestId('detail-close-button'));
    expect(mockRouter.asPath).toEqual('/');
  });

  

  it('detailed card component correctly displays the detailed card data', async () => {
    (useContext as Mock).mockReturnValue(contextValue);

    mockRouter.push('/');
    render(
        <Provider store={store}>
        <Detail item={mockData[0]}/>
      </Provider>
    , {
         wrapper: MemoryRouterProvider,
      }); 

      await waitFor(() =>
        expect(screen.getByTestId('detail-description')).toBeInTheDocument()
      );
      screen.debug;
      expect(
        (screen.getByTestId('detail-description') as HTMLElement).textContent
      ).toEqual('description1');
      expect(
        (screen.getByTestId('detail-name') as HTMLElement).textContent
      ).toEqual('name: name1');
      expect(
        (screen.getByTestId('detail-tagline') as HTMLElement).textContent
      ).toEqual('tagline1');
   });
});

