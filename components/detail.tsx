import { BeerItem } from '../types';
import { useRouter } from 'next/router';
import styles from "../styles/Details.module.css";

type Props = {
    item: BeerItem
  }

function Detail(props: Props) {
  const { name, description, tagline } = props.item;

  const router = useRouter();

  const closeClickHandler = () => {
    router.push('/');
  };

  return (
    <div className={styles.detailBlock} data-testid="details-panel">
              <h1>Beer details:</h1>
              <h2 data-testid="detail-name">name: {name}</h2>
              <div className="bold">Description</div>
              <div
                className={`${styles.marginLeftSmall} ${styles.detailDescription}`} 
                data-testid="detail-description"
              >
                {description}
              </div>
              <div className={styles.bold}>Tagline</div>
              <div
                className={styles.marginLeftSmall}
                data-testid="detail-tagline"
              >
                {tagline}
              </div>
              <button
                data-testid="detail-close-button"
                className={styles.close}
                onClick={closeClickHandler}
              >
                Close
              </button>
            </div>
  );
}

export default Detail;            