import type { User } from '../../types'

interface AttendeeAvatarsProps {
  attendeeIds: string[]
  users: Map<string, User>
}

export function AttendeeAvatars({ attendeeIds, users }: AttendeeAvatarsProps) {
  if (attendeeIds.length === 0) return null

  const visible = attendeeIds.filter((uid) => users.has(uid))

  if (visible.length === 0) return null

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
    </div>
  )
}
