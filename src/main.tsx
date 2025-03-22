import './index.css'
import App from './App.tsx'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter basename='KODE_trainee_test'>
                <App />
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
)