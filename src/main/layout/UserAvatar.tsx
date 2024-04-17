import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import icon from '@/main/assets/icon.png'
import { useUserStore } from '../store'

const UserAvatar: React.FC = () => {
  const user = useUserStore((s) => s.user)

  if (user == null) {
    return (
      <div className="flex items-center gap-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={icon} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">未登录</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <Avatar className="h-8 w-8">
        <AvatarImage src={icon} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{user.nickname}</span>
    </div>
  )
}

export default UserAvatar
