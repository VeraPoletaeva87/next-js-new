import Loader from "../components/loader";
import styles from "../styles/Details.module.css";
import { BeerItem } from "../types";

type Props = {
  item: BeerItem;
};

export const getServerSideProps = async (context: {
  params: { id: number };
}) => {
  const id = context?.params?.id;
  const response = await fetch(`https://api.punkapi.com/v2/beers/?ids=${id}`);
  const data = await response.json();

  return {
    props: {
      item: data[0],
    },
  };
};

export default function Detail({ item }: Props) {
  const isLoading = false;
  return (
    <>
      <main>
        <div data-testid="details-panel">
          {isLoading ? (
            <Loader />
          ) : (
            <div className={styles.detailBlock}>
              <h1>Beer details:</h1>
              <h2 data-testid="detail-name">name: {item?.name}</h2>
              <div className="bold">Description</div>
              <div
                className={`${styles.marginLeftSmall} ${styles.detailDescription}`} 
                data-testid="detail-description"
              >
                {item?.description}
              </div>
              <div className={styles.bold}>Tagline</div>
              <div
                className={styles.marginLeftSmall}
                data-testid="detail-tagline"
              >
                {item?.tagline}
              </div>
              <button
                data-testid="detail-close-button"
                className={styles.close}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
