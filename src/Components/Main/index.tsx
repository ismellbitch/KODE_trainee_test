import qs from 'qs'
import styles from './Main.module.scss'
import axios from "axios"
import blankProfilePicture from '../../assets/blankProfilePicture.png'
import notFound from '../../assets/notFound.svg'
import UsersSkeleton from '../Skeletons/UsersSkeleton'

import { useEffect } from "react"
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../redux/slices/filtersSlice.tsx'
import { NavLink, useNavigate } from 'react-router'
import { departments } from '../../data/departments'
import { sorts } from '../../data/sorts'
import { useQuery } from '@tanstack/react-query'
import { User } from '../../types/user'


function Main() {
    const navigate = useNavigate();

    const department = useSelector((state: RootState) => state.filters?.department)
    const sortProperty = useSelector((state: RootState) => state.filters?.sortProperty)
    const searchText = useSelector((state: RootState) => state.filters?.search)

    const lang = useSelector((state: RootState) => state.languages?.language)

    const dispatch = useDispatch()

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            dispatch(setFilters({
                ...params
            }));
        }
    }, [])

    const fetchUsers = async () => {
        const response = await axios.get(`https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all`);
        if (response) {
            return response.data.items;
        } else {
            return [];
        }
    }

    // Изначально я делал фильтацию по отделам через запросы к API, но после реализации кэширования решил, что целесообразнее будет фильтровать список на клиенте
    const filterByDepartment = (obj: User) => {
        if (obj.department == department || department == 'all') {
            return true;
        } else {
            return false;
        }
    }

    const filterBySearch = (obj: User) => {
        const fullName = obj.firstName + ' ' + obj.lastName;
        if (fullName.toLocaleLowerCase().includes(searchText.toLowerCase().trim())) {
            return true;
        } else if (obj.userTag.toLowerCase().includes(searchText.toLowerCase().trim())) {
            return true;
        } return false;
    }

    const sortByParam = (a: User, b: User): number => {
        if (sortProperty == sorts[0].key) {
            const aFullName = a.firstName + ' ' + a.lastName;
            const bFullName = b.firstName + ' ' + b.lastName;
            if (aFullName > bFullName) {
                return 1;
            } else return -1;
        } else {
            if (a.birthday > b.birthday) {
                return 1;
            } else return -1;
        }
    }

    const { data, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 300000,
        refetchInterval: 300000
    });

    useEffect(() => {
        if (data) {
            const queryString = qs.stringify({
                department,
                sortProperty,
                ...(searchText && { searchText })
            }, { skipNulls: true })


            navigate(`?${queryString}`)
        }
    }, [department, sortProperty, searchText])

    const skeletons = Array.from({ length: 12 }).map((_, index) => <UsersSkeleton className={styles.skeleton} key={index} />);

    const renderUsersList = () => {
        const usersToRender = data ? data.filter(((obj) => filterByDepartment(obj)))
            .filter((obj) => filterBySearch(obj))
            .sort((a, b) => sortByParam(a, b))
            : []

        if (usersToRender.length > 0) {

            return usersToRender.map((item: User) => {
                const findDepartment = departments.find((dep) => dep.key == item.department);

                return (
                    <NavLink to={`/users/${item.id}`} key={item.id} state={{ item }} className={styles.userBlock} >
                        {/* Подключаю заглушки потому что картинки с API не грузятся */}
                        <img src={blankProfilePicture} alt='' className={styles.userAvatar} />
                        <div className={styles.userDataBlock}>
                            <div className={styles.userNameAndTag}>
                                <p className={styles.userName}>{item.firstName} {item.lastName}</p>
                                <p className={styles.userTag}>{item.userTag}</p>
                            </div>
                            <p className={styles.userDepartment}>{lang == 'ru' ? findDepartment?.valueRu : findDepartment?.valueEn}</p>
                        </div>
                    </NavLink>
                )
            })
        } else {
            return (
                <div className={styles.notFoundBlock}>
                    <img src={notFound} alt="" />
                    <p className={styles.errorHeader}>Мы никого не нашли</p>
                    <p className={styles.errorDesc}>Попробуй скорректировать запрос</p>
                </div>
            )
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                {isLoading ? skeletons : renderUsersList()}
            </div>
        </section>
    )
}

export default Main