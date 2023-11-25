import Result from '../components/results';
import Search from '../components/search';
import styles from '../styles/Search.module.css';
import React, { ReactElement } from 'react';
import router from 'next/router';

const mainClickHandler = () => {
    router.push('/');
  };

export default function ItemsLayout({children}: {children: ReactElement}) {

    return <div>
        <Search/>
        <div className={styles.flex} onClick={mainClickHandler}>
            <Result items={children.props.items}/>
            {children}
        </div>
        </div>
}