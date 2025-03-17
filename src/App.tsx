import DetailsPage from "./Pages/DetailsPage"
import MainPage from "./Pages/MainPage"
import NotFoundPage from "./Pages/NotFoundPage"

import { Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



function App() {
  const queryClient = new QueryClient();

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