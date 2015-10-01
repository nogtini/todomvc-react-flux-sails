/**
 * Todo.js
 *
 * @description :: Todo model for persistance
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    "id": {
      primaryKey: true,
      required: true,
      type: 'string'
    },
    "complete": {
      type: 'boolean',
      required: true
    },
    "text": {
      type: 'string',
      required: true
    }
  },
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false
};
