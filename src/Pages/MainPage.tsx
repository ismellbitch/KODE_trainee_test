import { useEffect } from "react"
import Main from "../Components/Main"
import TopAppBar from "../Components/TopAppBar"
import topAppBarText from '../Components/TopAppBar/TopAppBarText.json'


function MainPage() {
    const lang = localStorage.getItem('lang');
    const text = lang == 'ru' ? topAppBarText.ru : topAppBarText.en

    useEffect(() => {
        document.title = text.header
    }, [])

    return (
        <>
            <TopAppBar />
            <Main />
        </>
    )
}

export default MainPage