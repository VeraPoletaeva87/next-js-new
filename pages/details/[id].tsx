import ItemsLayout from "../itemsLayout";
import { BeerItem } from "../../types";
import Detail from '../../components/detail';

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

export default function DetailPage({ item }: Props) {
  return (
    <>
      <main>
        <ItemsLayout>
            <Detail item={ item }></Detail>
        </ItemsLayout>
      </main>
    </>
  );
}