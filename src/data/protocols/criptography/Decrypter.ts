export interface Decrypter {
  decrypt (payload: string): Promise<string>;
}
