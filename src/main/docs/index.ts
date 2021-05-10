import paths from './ImportPaths'
import components from './ImportComponents'
import schemas from './ImportSchemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Template Clean Server',
    description: 'NodeJS Api server template using concepts design patterns, clean code and SOLID principles',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/CPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Account'
  }, {
    name: 'Surveys'
  }],
  paths: paths,
  schemas: schemas,
  components: components
}
