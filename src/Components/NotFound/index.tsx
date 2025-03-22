import styles from './NotFound.module.scss'
import errordSvg from '../../assets/error.svg'
import notFoundText from './NotFoundText.json'

import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


function NotFound() {
    const lang = useSelector((state: RootState) => state.languages?.language)

    const text = lang == 'ru' ? notFoundText.ru : notFoundText.en;

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <img src={errordSvg} alt="" />
                <p className={styles.errorHeader}>{text.header}</p>
                <p className={styles.errorDesc}>{text.desc}</p>
                <Link to='/' className={styles.link}>{text.tryAgain}</Link>
            </div>
        </section>
    )
}

export default NotFound