import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (collectionName: string): Collection {
    return this.client.db().collection(collectionName)
  },

  map (collection: any): any {
    const { _id, ...collenctionWithoutId } = collection
    return Object.assign({}, collenctionWithoutId, { id: _id })
  }
}
