import React, { memo } from 'react'
import { Button } from 'antd'
import { toggleDevtools } from '../../utils/ipc'

const Setting: React.FC = () => {
    return (
        <div>
            <Button onClick={toggleDevtools}>ToggleDevtools</Button>
        </div>
    )
}

export default memo(Setting)
