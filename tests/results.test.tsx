import Result from '../components/results';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import {
  expect,
  describe,
  it,
  test,
  vi,
  beforeEach,
  Mock,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

const mockData = [
  {
    id: 1,
    name: 'Buzz',
    description: 'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
  },
  {
    id: 2,
    name: 'name2',
    description: 'description2',
  },
  {
    id: 3,
    name: 'name3',
    description: 'description3',
  },
  {
    id: 4,
    name: 'name4',
    description: 'description4',
  },
  {
    id: 5,
    name: 'name5',
    description: 'description5',
  },
];

vi.mock('next/router', () => require('next-router-mock'));


vi.mock('react', async () => {
  const react = await vi.importActual<typeof import('react')>('react');
  return {
    ...react,
    useContext: vi.fn(),
  };
});

const contextValue = {
    searchString: '',
    setSearchString: vi.fn(),
    items: mockData,
    setItems: vi.fn(),
};

describe('Result', () => {
  it('renders the correct number of items in the list', async () => {
  (useContext as Mock).mockReturnValue(contextValue);

    mockRouter.push('/');
    render(<Provider store={store}>
            <Result items = {mockData}/>
           </Provider>, {
      wrapper: MemoryRouterProvider,
    }); 

      const expectedItemsCount = 5;
      const listItems = screen.getAllByTestId('list-item'); 
      expect(listItems.length).toEqual(expectedItemsCount);
  });

  test('the correct message is displayed if no cards are present'),
      render(
        <Provider store={store}>
          <Result items = {[]}/>
        </Provider>
      );

      expect(screen.getByTestId('empty-text')).toBeInTheDocument();

  it('clicking on a card opens a detailed card component', async () => {
    (useContext as Mock).mockReturnValue(contextValue);

    mockRouter.push('/');
    render(<Provider store={store}>
        <Result items = {mockData}/>
       </Provider>, {
      wrapper: MemoryRouterProvider,
    }); 

    await waitFor(() => expect(screen.getByTestId('list')).toBeInTheDocument());
    const item = screen.getByTestId('list').children[0];
    await userEvent.click(item);
    expect(mockRouter.asPath).toEqual('/details/1');
  });

  it('card component renders the relevant card data', async () => {
    (useContext as Mock).mockReturnValue(contextValue);

    mockRouter.push('/');
    render(
        <Provider store={store}>
            <Result items = {mockData}/>
        </Provider>
    , {
         wrapper: MemoryRouterProvider,
      }); 


      await waitFor(() =>
        expect(screen.getByTestId('list')).toBeInTheDocument()
      );
      const description = screen.getAllByTestId('item-description')[0];
      const name = screen.getAllByTestId('item-name')[0];
      expect((description as HTMLElement).textContent).toEqual(
        'Publish date: A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.'
      );
      expect((name as HTMLElement).textContent).toEqual('Title: Buzz');
  });
});