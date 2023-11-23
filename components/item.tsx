import styles from '../styles/Item.module.css';

interface ItemProps {
  id: number;
  name: string;
  description: string;
  clickHandler: (id: number) => void;
}

function Item(props: ItemProps) {
  const { id, name, description, clickHandler } = props;

  const liClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    clickHandler(id);
  };

  return (
    <li
      data-testid="list-item"
      className={styles.item}
      key={id}
      onClick={liClickHandler}
    >
      <div className={styles.title} data-testid="item-name">
        Title: {name}
      </div>
      <div className={styles.description} data-testid="item-description">
        Publish date: {description}
      </div>
    </li>
  );
}

export default Item;
