import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,
  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (collectionName: string): Promise<Collection> {
    if (!this.client || !this.client.isConnected()) {
      await this.connect(this.url)
    }
    return this.client.db().collection(collectionName)
  },

  map: (data: any): any => {
    const { _id, ...collenctionWithoutId } = data
    return Object.assign({}, collenctionWithoutId, { id: _id })
  },

  mapCollection: (collection: any[]): any => {
    return collection.map(item => MongoHelper.map(item))
  }
}
