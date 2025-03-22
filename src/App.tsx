import DetailsPage from "./Pages/DetailsPage"
import MainPage from "./Pages/MainPage"
import NotFoundPage from "./Pages/NotFoundPage"

import { Route, Routes } from "react-router"
import { setTheme } from './redux/slices/themesSlice.tsx'
import { setLanguage } from './redux/slices/languagesSlice.tsx'
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../../redux/store'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"


function App() {
  const dispatch = useDispatch()

  const theme = useSelector((state: RootState) => state.themes?.theme)

  useMemo(() => {
    if (localStorage.getItem('theme')) {
      dispatch(setTheme(localStorage.getItem('theme')));
    } else {
      localStorage.setItem('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    if (localStorage.getItem('lang')) {
      dispatch(setLanguage(localStorage.getItem('lang')));
    } else {
      localStorage.setItem('theme', navigator.language == 'ru' ? 'ru' : 'en');
    }

    document.documentElement.setAttribute('theme', theme == 'dark' ? 'dark' : '');
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' index element={<MainPage />} />
        <Route path='/users/:id' element={<DetailsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App