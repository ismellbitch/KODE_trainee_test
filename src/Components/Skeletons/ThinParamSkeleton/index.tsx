import ContentLoader from "react-content-loader"

const ThinParamSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width={65}
        height={20}
        viewBox="0 0 65 20"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="3" ry="3" width="65" height="20" />
    </ContentLoader>
)

export default ThinParamSkeleton