import styles from './Details.module.scss'
import axios from 'axios'
import blank from '../../assets/blankProfilePicture.png'
import goBackSvgLight from '../../assets/goBack.svg'
import goBackSvgDark from '../../assets/goBackDark.svg'
import starSvgLight from '../../assets/star.svg'
import starSvgDark from '../../assets/starDark.svg'
import phoneSvgLight from '../../assets/phone.svg'
import phoneSvgDark from '../../assets/phoneDark.svg'

import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { User } from '../../types/user'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { departments } from '../../data/departments'
import { setTheme } from '../../redux/slices/themesSlice'
import DetailsSkeleton from '../Skeletons/DetailsHeaderSkeleton'
import WideParamSkeleton from '../Skeletons/WideParamSkeleton'
import ThinParamSkeleton from '../Skeletons/ThinParamSkeleton'


function Details() {
    const navigate = useNavigate();

    const theme = useSelector((state: RootState) => state.themes?.theme)

    const dispatch = useDispatch()

    useMemo(() => {
        if (localStorage.getItem('theme')) {
            dispatch(setTheme(localStorage.getItem('theme')));
        } else {
            localStorage.setItem('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        document.documentElement.setAttribute('theme', theme == 'dark' ? 'dark' : '');
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('theme', theme == 'dark' ? 'dark' : '');
        localStorage.setItem('theme', theme == 'dark' ? 'dark' : 'light ')
    }, [theme])

    const fetchUsers = async () => {
        const response = await axios.get(`https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all`);
        if (response) {
            return response.data.items;
        } else {
            return null;
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['userDetails'],
        queryFn: fetchUsers,
        select: (data) => {
            return data.find((item: User) => item.id == window.location.pathname.substring(7))
        }
    })

    const goBackSvg = theme == 'dark' ? goBackSvgDark : goBackSvgLight;
    const starSvg = theme == 'dark' ? starSvgDark : starSvgLight;
    const phoneSvg = theme == 'dark' ? phoneSvgDark : phoneSvgLight;

    const renderUserDetails = () => {
        const currentDate = new Date();
        const birthdayDate = new Date(data.birthday)

        const months = ["января", "февраля", "марта",
            "апреля", "мая", "июня",
            "июля", "августа", "сентября",
            "октября", "ноября", "декабря"];

        const birthdayToOutput = birthdayDate.getDate() + ' ' + months[birthdayDate.getMonth()] + ' ' + birthdayDate.getFullYear();


        const timeDifference = currentDate.getTime() - birthdayDate.getTime();
        const millisecondsInYear = 31447600000;
        const yearsDifference = timeDifference / millisecondsInYear;
        const fullYears = Math.floor(yearsDifference);

        const getFullYearsEnding = (num: number) => {
            if (num >= 5 && num <= 20) {
                return ' лет';
            }

            const lastDigit = num % 10;

            switch (lastDigit) {
                case 1:
                    return ' год';
                case 2:
                case 3:
                case 4:
                    return ' года';
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    return ' лет';
            }
        }


        const countryCode = data.phone.substring(0, 2);
        const operatorCode = data.phone.substring(2, 5);
        const threeNums = data.phone.substring(5, 8);
        const firstTwoNums = data.phone.substring(8, 10);
        const secondTwoNums = data.phone.substring(10, 12);

        const phoneToOutput = countryCode + ' (' + operatorCode + ') ' + threeNums + ' ' + firstTwoNums + ' ' + secondTwoNums;



        return (
            <>
                <div className={styles.headerContainer}>
                    <div className={styles.headerContent}>
                        <div className={styles.goBackBlock} onClick={() => navigate('/')}>
                            <img src={goBackSvg} className={styles.goBackSvg} />
                        </div>
                        <div className={styles.userHeader}>
                            <img src={blank} alt="" className={styles.userProfilePicture} />
                            <div className={styles.userNameAndTag}>
                                <p className={styles.name}>{data.firstName}</p>
                                <p className={styles.name}>{data.lastName}</p>
                                <p className={styles.tag}>{data.userTag}</p>
                            </div>
                            <p className={styles.userDepartment}>{departments.find((dep) => dep.key == data.department)?.value}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.infoContent}>
                        <div className={styles.infoRowFirst}>
                            <div className={styles.userBirthday}>
                                <img src={starSvg} alt="" />
                                <p className={styles.userInfo}>{birthdayToOutput}</p>
                            </div>
                            <p className={styles.userAge}>{fullYears} {getFullYearsEnding(fullYears)}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <img src={phoneSvg} alt="" />
                            <p className={styles.userInfo}>{phoneToOutput}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const renderSkeleton =
        <>
            <div className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <div className={styles.goBackBlock} onClick={() => navigate('/')}>
                        <img src={goBackSvg} className={styles.goBackSvg} />
                    </div>
                    <div className={styles.headerSkeletonContainer}>
                        <DetailsSkeleton className={styles.headerSkeleton} />
                    </div>
                </div>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.infoContent}>
                    <div className={styles.infoRowFirst}>
                        <div className={styles.userBirthday}>
                            <img src={starSvg} alt="" />
                            <WideParamSkeleton className={styles.userInfo} />
                        </div>
                        <ThinParamSkeleton className={styles.userAge} />
                    </div>
                    <div className={styles.infoRow}>
                        <img src={phoneSvg} alt="" />
                        <WideParamSkeleton className={styles.userInfo} />
                    </div>
                </div>
            </div>
        </>

    return (
        <section className={styles.detailsContainer}>
            {isLoading ? renderSkeleton : renderUserDetails()}
        </section>
    )
}

export default Details