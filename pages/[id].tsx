import Loader from '../components/loader';
import styles from '../styles/Details.module.css';
import { BeerItem } from '../types';

type Props = {
  item: BeerItem
}

type PageProps = {
  id: number
}

export const getServerSideProps = async (context: { params: { id: number; }; }) => {
  const id = context?.params?.id;
  const response = await fetch(`https://api.punkapi.com/v2/beers/?ids=${id}`);
  const data = await response.json();

  return {
    props: {
      item: data
    }
  }
}

export default function Detail({item}: Props) {
  const isLoading = false;
  return (
    <>
      <main>
      <div data-testid="details-panel">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="detail-block">
          <h1>Beer details:</h1>
          <h2 data-testid="detail-name">name: {item?.name}</h2>
          <div className="bold">Description</div>
          <div
            className="detail-description margin-left-small"
            data-testid="detail-description"
          >
            {item?.description}
          </div>
          <div className="bold">Tagline</div>
          <div className="margin-left-small" data-testid="detail-tagline">
            {item?.tagline}
          </div>
          <button
            data-testid="detail-close-button"
            className="close"
          >
            Close
          </button>
        </div>
      )}
    </div>
      </main>
    </>
  )
}