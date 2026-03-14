export interface Performance {
  id: string;
  name: string;
  stage: string;
  day: 1 | 2;
  startTime: string;
  endTime: string;
  tag?: string;
}

export interface Stage {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  createdAt: Date;
}

export interface Selection {
  performanceId: string;
  attendees: string[];
  updatedAt: Date;
}
