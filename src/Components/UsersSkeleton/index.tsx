import ContentLoader from "react-content-loader"

const UsersSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width={232}
        height={72}
        viewBox="0 0 232 72"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="88" y="19" rx="6" ry="6" width="144" height="16" />
        <rect x="0" y="0" rx="100" ry="100" width="72" height="72" />
        <rect x="88" y="47" rx="6" ry="6" width="80" height="12" />
    </ContentLoader>
)

export default UsersSkeleton