import React, { memo } from 'react'
import { useSearchParams } from "react-router-dom";

const Search: React.FC = () => {
    let [searchParams] = useSearchParams();
    console.log(searchParams.get('q'))
    return (
        <>Search</>
    )
}

export default memo(Search)
