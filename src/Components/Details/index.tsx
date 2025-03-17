import goBackSvg from '../../assets/goBack.svg'
import styles from './Details.module.scss'
import blank from '../../assets/blankProfilePicture.png'
import starSvg from '../../assets/star.svg'
import phoneSvg from '../../assets/phone.svg'

import { useLocation, useNavigate } from 'react-router'
import { departments } from '../../data/departments'


function Details() {
    const navigate = useNavigate();
    const location = useLocation();

    const userData = location.state.item;

    console.log(window.location.pathname.substring(7));

    return (
        <section>
            <div className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <div className={styles.goBackBlock} onClick={() => navigate('/')}>
                        <img src={goBackSvg} className={styles.goBackSvg} />
                    </div>
                    <div className={styles.userHeader}>
                        <img src={blank} alt="" className={styles.userProfilePicture} />
                        <div className={styles.userNameAndTag}>
                            <p className={styles.name}>{userData.firstName}</p>
                            <p className={styles.name}>{userData.lastName}</p>
                            <p className={styles.tag}>{userData.userTag}</p>
                        </div>
                        <p className={styles.userDepartment}>{departments.find((dep) => dep.key == userData.department)?.value}</p>
                    </div>
                </div>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.infoContent}>
                    <div className={styles.infoRowFirst}>
                        <div className={styles.userBirthday}>
                            <img src={starSvg} alt="" />
                            <p className={styles.userInfo}>5 июня 1996</p>
                        </div>
                        <p className={styles.userAge}>24 года</p>
                    </div>
                    <div className={styles.infoRow}>
                        <img src={phoneSvg} alt="" />
                        <p className={styles.userInfo}>+7 (999) 900 90 90</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Details