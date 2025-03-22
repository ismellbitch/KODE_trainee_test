import ContentLoader from "react-content-loader"

import { skeletonProps } from "../../../types/skeletonProps"


const ThinParamSkeleton = (props: skeletonProps) => {
    const theme = localStorage.getItem('theme')

    return (
        <ContentLoader
            speed={2}
            width={65}
            height={20}
            viewBox="0 0 65 20"
            backgroundColor={theme == 'dark' ? '#2C2C2C' : '#F3F3F3'}
            foregroundColor={theme == 'dark' ? '#AAAAAA' : '#ECEBEB'}
            {...props}
        >
            <rect x="0" y="0" rx="3" ry="3" width="65" height="20" />
        </ContentLoader>
    )
}

export default ThinParamSkeleton