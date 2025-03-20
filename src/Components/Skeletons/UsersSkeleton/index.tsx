import ContentLoader from "react-content-loader"

const UsersSkeleton = (props) => {
    const theme = localStorage.getItem('theme')

    return (
        <ContentLoader
            speed={2}
            width={232}
            height={72}
            viewBox="0 0 232 72"
            backgroundColor={theme == 'dark' ? '#2C2C2C' : '#F3F3F3'}
            foregroundColor={theme == 'dark' ? '#AAAAAA' : '#ECEBEB'}
            {...props}
        >
            <rect x="88" y="19" rx="6" ry="6" width="144" height="16" />
            <rect x="6" y="0" rx="100" ry="100" width="72" height="72" />
            <rect x="88" y="47" rx="6" ry="6" width="80" height="12" />
        </ContentLoader>
    )
}

export default UsersSkeleton