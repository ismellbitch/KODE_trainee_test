import DetailsPage from "./Pages/DetailsPage"
import MainPage from "./Pages/MainPage"
import NotFoundPage from "./Pages/NotFoundPage"

import { Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setTheme } from './redux/slices/themesSlice'
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../../redux/store'



function App() {
  const queryClient = new QueryClient();

  const dispatch = useDispatch()

  const theme = useSelector((state: RootState) => state.themes?.theme)

  useMemo(() => {
    if (localStorage.getItem('theme')) {
      dispatch(setTheme(localStorage.getItem('theme')));
    } else {
      localStorage.setItem('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    document.documentElement.setAttribute('theme', theme == 'dark' ? 'dark' : '');
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' index element={<MainPage />} />
          <Route path='/users/:id' element={<DetailsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App