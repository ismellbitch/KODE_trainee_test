import qs from 'qs'
import styles from './Main.module.scss'
import axios from "axios"
import blankProfilePicture from '../../assets/blankProfilePicture.png'
import notFound from '../../assets/notFound.svg'
import UsersSkeleton from '../UsersSkeleton'

import { useEffect, useRef, useState } from "react"
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../redux/slices/filtersSlice'
import { NavLink, useNavigate } from 'react-router'
import { departments } from '../../data/departments'
import { sorts } from '../../data/sorts'
import { useQuery } from '@tanstack/react-query'


function Main() {
    const navigate = useNavigate();

    const department = useSelector((state: RootState) => state.filters?.department)
    const sortProperty = useSelector((state: RootState) => state.filters?.sortProperty)
    const searchText = useSelector((state: RootState) => state.filters?.search)
    const dispatch = useDispatch()

    const isSearchNeeded = useRef(false);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);
    const [usersList, setUsersList] = useState([
        {
            avatarUrl: '',
            birthday: '',
            department: '',
            firstName: '',
            id: '',
            lastName: '',
            phone: '',
            position: '',
            userTag: ''
        }
    ])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            dispatch(setFilters({
                ...params
            }));

            isSearchNeeded.current = true;
        }
    }, [])

    // const fetchUsers = async () => {
    //     setIsUsersLoaded(false);
    //     await axios.get(`https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${department}`)
    //         .then((res) => setUsersList(res.data.items))
    //         .then(() => setIsUsersLoaded(true));
    // }

    const fetchUsers = async () => {
        setIsUsersLoaded(false);
        const response = await axios.get(`https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${department}`);
        if (response) {
            console.log(response.data.items)
            return response.data.items;
        } else {
            console.log('zzz')
        }
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 300000,
        gcTime: 300000,
        refetchInterval: 300000,
        select: (data) => {
            return data.filter(((obj) => {
                if (obj.department == department || department == 'all') {
                    return true;
                } else {
                    return false;
                }
            })).filter((obj) => {
                const fullName = obj.firstName + ' ' + obj.lastName;
                if (fullName.toLocaleLowerCase().includes(searchText.toLowerCase().trim())) {
                    return true;
                } else if (obj.userTag.toLowerCase().includes(searchText.toLowerCase().trim())) {
                    return true;
                } return false;
            }).sort((a, b) => {
                if (sortProperty == sorts[0].key) {
                    const aFullName = a.firstName + ' ' + a.lastName;
                    const bFullName = b.firstName + ' ' + b.lastName;
                    if (aFullName > bFullName) {
                        return 1;
                    } else return -1;
                } else if (sortProperty == sorts[1].key) {
                    if (a.birthday > b.birthday) {
                        return 1;
                    } else return -1;
                }
            }).map((item) => (
                <NavLink to={`/users/${item.id}`} key={item.id} state={{ item }} className={styles.userBlock} >
                    {/* Подключаю заглушки потому что картинки с API не грузятся */}
                    <img src={blankProfilePicture} alt='' className={styles.userAvatar} />
                    <div className={styles.userDataBlock}>
                        <div className={styles.userNameAndTag}>
                            <p className={styles.userName}>{item.firstName} {item.lastName}</p>
                            <p className={styles.userTag}>{item.userTag}</p>
                        </div>
                        <p className={styles.userDepartment}>{departments.find((dep) => dep.key == item.department)?.value}</p>
                    </div>
                </NavLink>
            ))
        }
    });

    useEffect(() => {
        if (data) {
            const queryString = qs.stringify({
                department,
                sortProperty,
                ...(searchText && { searchText })
            }, { skipNulls: true })


            navigate(`?${queryString}`)

            if (searchText) {
                usersList.filter(obj => {
                    if (obj.firstName.toLocaleLowerCase().includes(searchText.toLowerCase())) {
                        return true;
                    } else return false;
                })
            }
        }
    }, [department, sortProperty, searchText])

    const skeletons = Array.from({ length: 12 }).map((item, index) => <UsersSkeleton className={styles.skeleton} key={index} />);

    return (
        <section className={styles.content}>
            {isLoading ? skeletons : data}
        </section>
    )
}

export default Main