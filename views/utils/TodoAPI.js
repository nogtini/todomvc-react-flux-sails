/**
 * TodoAPI
 *
 * @description :: Create CRUD actions to manage async data before action handlers
 */
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoActions = require('../actions/TodoActions'),
  $ = require('jquery');

module.exports = {

  /**
   * Creates a todo on the server then dispatches change
   */
  sailsCreateTodo: function(data, callback) {
    $.ajax({
      url: '/Todo',
      type: 'POST',
      data: data
    }).done(function (msg) {
      callback();
    });
  },

  /**
   * Returns todos to hydrate store
   */
  sailsReadTodos: function(callback) {
    $.ajax({
      url: '/Todo',
      type: 'GET',
      dataType: 'json'
    }).done(function (data) {
      callback(data);
    });
  },

  /**
   * Updates texts on server then dispatches change to stores
   */
  sailsUpdateText: function(id, text, callback) {
    $.ajax({
      url: '/Todo/update/'+id+'?text='+text,
      type: 'GET',
      dataType: 'json'
    }).done(function (data) {
      callback(data);
    });
  },

  /**
   * Toggles complete on server then dispatches change to stores
   */
  sailsToggleComplete: function(id, complete, callback) {
    $.ajax({
      url: '/Todo/update/'+id+'?complete='+complete,
      type: 'GET',
      dataType: 'json'
    }).done(function (data) {
      callback(data);
    });
  },

  /**
   * Destroys todo on server then dispatches change to stores
   */
  sailsDestroy: function (id, callback) {
    $.ajax({
      url: '/Todo/' + id,
      type: 'DELETE'
    }).done(function () {
      callback();
    });
  }
};
