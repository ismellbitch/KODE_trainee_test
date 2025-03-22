import ContentLoader from "react-content-loader"

import { skeletonProps } from "../../../types/skeletonProps"

const DetailsSkeleton = (props: skeletonProps) => {
    const theme = localStorage.getItem('theme')

    return (
        <ContentLoader
            speed={2}
            width={220}
            height={184}
            viewBox="0 0 220 184"
            backgroundColor={theme == 'dark' ? '#3b3838' : "#e8e8e8"}
            foregroundColor={theme == 'dark' ? '#AAAAAA' : "#ffffff"}
            {...props}
        >
            <rect x="5" y="131" rx="3" ry="3" width="210" height="28" />
            <rect x="60" y="168" rx="3" ry="3" width="100" height="16" />
            <circle cx="110" cy="51" r="51" />
        </ContentLoader>
    )
}

export default DetailsSkeleton