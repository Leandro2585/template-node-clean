export interface HashComparer {
  compare(payload: string, hash: string): Promise<boolean>;
}
