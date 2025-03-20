import styles from './TopAppBar.module.scss'
import searchSvg from '../../assets/search.svg'
import searchActiveSvgLight from '../../assets/searchActive.svg'
import searchActiveSvgDark from '../../assets/searchActiveDark.svg'
import sortSvg from '../../assets/sort.svg'
import closeModalLight from '../../assets/closeModal.svg'
import closeModalDark from '../../assets/closeModalDark.svg'

import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter, changeSort, changeSearchText } from '../../redux/slices/filtersSlice'
import { toggleTheme, setTheme } from '../../redux/slices/themesSlice'
import { RootState } from '../../redux/store'
import { departments } from '../../data/departments'
import { sorts } from '../../data/sorts'


function TopAppBar() {
    const department = useSelector((state: RootState) => state.filters?.department)
    const sortPropery = useSelector((state: RootState) => state.filters?.sortProperty)
    const searchText = useSelector((state: RootState) => state.filters?.search)

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
        localStorage.setItem('theme', theme == 'dark' ? 'dark' : '')
    }, [theme])

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleDepartmentChange = (key: string) => {
        dispatch(changeFilter(key));
    }

    const handleSearchText = (text: string) => {
        dispatch(changeSearchText(text));
    }

    const handleModalOpen = () => {
        toggleScrollability();
        setIsModalOpen(true);
    }

    const handleModalExit = () => {
        toggleScrollability();
        setIsModalOpen(false);
    }

    const handleChangeSelectedRadio = (key: string) => {
        dispatch(changeSort(key));
        toggleScrollability();
        setIsModalOpen(false);
    }

    const toggleScrollability = () => {
        setIsModalOpen(!isModalOpen);

        if (!isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    const toggleThemeHandler = () => {
        dispatch(toggleTheme())
        localStorage.setItem('theme', theme == 'dark' ? 'dark' : '')
    }

    const searchActiveSvg = theme == 'dark' ? searchActiveSvgDark : searchActiveSvgLight;

    const closeModal = theme == 'dark' ? closeModalDark : closeModalLight;

    return (
        <>
            <div className={`${styles.modal} ${isModalOpen ? styles.modalVisible : null}`} onClick={() => handleModalExit()}>
                <div className={`${styles.modalBlock} ${isModalOpen ? styles.modalBlockVisible : null}`} onClick={(e) => e.stopPropagation()}>
                    <div className={`${styles.modalBlockContent} ${isModalOpen ? styles.modalBlockVisible : null}`}>
                        <div className={`${styles.modalBlockHeader} ${isModalOpen ? styles.modalBlockVisible : null}`}>
                            <div className={styles.modalBlockHeaderBlank}></div>
                            <h3>Сортировка</h3>
                            <img src={closeModal} alt="" onClick={() => handleModalExit()} />
                        </div>
                        {sorts.map((item) => (
                            <div className={styles.radioBlock} key={item.key} onClick={() => handleChangeSelectedRadio(item.key)}>
                                <div className={styles.radioButtonBlock}>
                                    <input type="radio" />
                                    <span className={`${styles.radioCustom} ${item.key == sortPropery ? styles.selectedRadio : null}`}></span>
                                </div>
                                <p>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <header className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.headerContainer}>
                        <h2>Поиск</h2>
                        <div className={styles.langAndThemeContainer}>
                            <h2 onClick={() => toggleThemeHandler()}>{theme}</h2>
                        </div>
                    </div>
                    <div className={styles.searchContainer}>
                        <img src={isInputFocused || searchText ? searchActiveSvg : searchSvg} alt="" />
                        <input type="text"
                            value={searchText}
                            placeholder='Введи имя, тег, почту...'
                            className={styles.searchInput}
                            onFocusCapture={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                            onChange={(event) => handleSearchText(event.target.value)} />
                        <img src={sortSvg} alt="" onClick={() => handleModalOpen()} />
                    </div>

                    <div className={styles.departmentsContainer}>
                        {departments.map((item) => (
                            <div className={`${styles.department} ${department == item.key ? styles.selectedDepartment : null}`}
                                onClick={() => handleDepartmentChange(item.key)}
                                key={item.key}>
                                <p>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
        </>
    )
}

export default TopAppBar