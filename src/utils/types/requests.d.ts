export interface MeteorRequest {
  date: Date | null;
  countOnly: boolean;
  wereDangerousMeteors: boolean;
}

export interface UserRequest {
  userId: number | null;
  userName: string | null;
  apiKey: string | null;
}
