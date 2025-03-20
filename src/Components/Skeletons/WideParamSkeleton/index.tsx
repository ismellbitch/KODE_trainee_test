import ContentLoader from "react-content-loader"

const WideParamSkeleton = (props) => {
    const theme = localStorage.getItem('theme')

    return (
        <ContentLoader
            speed={2}
            width={150}
            height={20}
            viewBox="0 0 150 20"
            backgroundColor={theme == 'dark' ? '#2C2C2C' : '#F3F3F3'}
            foregroundColor={theme == 'dark' ? '#AAAAAA' : '#ECEBEB'}
            {...props}
        >
            <rect x="0" y="0" rx="3" ry="3" width="150" height="20" />
        </ContentLoader>
    )
}

export default WideParamSkeleton