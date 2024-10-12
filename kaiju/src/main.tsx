import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from "./components/AuthProvider.tsx";
import { store } from './app/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(

    <AuthProvider>
        <Provider store={store} >
            <App />
        </Provider>
    </AuthProvider>

)
