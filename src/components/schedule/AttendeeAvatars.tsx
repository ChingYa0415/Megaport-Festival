import type { User } from '../../types'

interface AttendeeAvatarsProps {
  attendeeIds: string[]
  users: Map<string, User>
}

export function AttendeeAvatars({ attendeeIds, users }: AttendeeAvatarsProps) {
  if (attendeeIds.length === 0) return null

  const maxShow = 3
  const visible = attendeeIds.slice(0, maxShow)
  const overflow = attendeeIds.length - maxShow

  return (
    <div className="avatar-stack mt-1">
      {visible.map((uid) => {
        const user = users.get(uid)
        return user ? (
          <img
            key={uid}
            src={user.avatarUrl}
            alt={user.name}
            title={user.name}
            className="avatar-img"
          />
        ) : null
      })}
      {overflow > 0 && (
        <span className="text-[10px] text-white/70 leading-[22px] ml-0.5">
          +{overflow}
        </span>
      )}
    </div>
  )
}
