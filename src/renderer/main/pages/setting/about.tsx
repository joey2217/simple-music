import React, { memo } from 'react'

const About: React.FC = () => {
    return (
        <div>
            <div>chrome{window.versions.chrome}</div>
            <div>node:{window.versions.node}</div>
            <div>electron{window.versions.electron}</div>
            <div>version{window.versions.version}</div>
            <div>platform{window.versions.platform}</div>
        </div>
    )
}

export default memo(About)
