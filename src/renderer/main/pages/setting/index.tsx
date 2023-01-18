import React, { memo } from 'react'
import { Button } from 'antd'
import { toggleDevtools } from '../../utils/ipc'
import { fetchToken } from '../../api/request'
import { fetchSearchKey } from '../../api/top'

const Setting: React.FC = () => {
    return (
        <div>
            <Button onClick={toggleDevtools}>ToggleDevtools</Button>
            <Button onClick={fetchToken}>api</Button>
            <Button onClick={fetchSearchKey}>fetchSearchKey</Button>
        </div>
    )
}

export default memo(Setting)
