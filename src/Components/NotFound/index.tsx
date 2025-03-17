import styles from './NotFound.module.scss'
import errordSvg from '../../assets/error.svg'

import { Link } from 'react-router'

function NotFound() {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <img src={errordSvg} alt="" />
                <p className={styles.errorHeader}>Какой-то сверхразум все сломал</p>
                <p className={styles.desc}>Постараемся быстро починить</p>
                <Link to='/' className={styles.link}>Попробовать снова</Link>
            </div>
        </section>
    )
}

export default NotFound