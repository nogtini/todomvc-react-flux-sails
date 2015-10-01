/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var TodoAPI = require('../utils/TodoAPI');

var TodoActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    var id, data = {};
    // Using the current timestamp + random number in place of a real id.
    id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    data[id] = {
      id: id,
      complete: false,
      text: text
    };

    //send to server and store
    TodoAPI.sailsCreateTodo(data[id], function () {
      //dispatch to store
      AppDispatcher.dispatch({
        actionType: TodoConstants.TODO_CREATE,
        data: data[id]
      });
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    TodoAPI.sailsUpdateText(id, text, function () {
      AppDispatcher.dispatch({
        actionType: TodoConstants.TODO_UPDATE_TEXT,
        id: id,
        text: text
      });
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
      TodoConstants.TODO_UNDO_COMPLETE :
      TodoConstants.TODO_COMPLETE;

    TodoAPI.sailsToggleComplete(id, !todo.complete, function () {
      AppDispatcher.dispatch({
        actionType: actionType,
        id: id
      });
    })
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    //send to server and store
    TodoAPI.sailsDestroy(id, function () {
      AppDispatcher.dispatch({
        actionType: TodoConstants.TODO_DESTROY,
        id: id
      });
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  },

  /**
   * Update store with server data, then use callback for store retrieval
   */
  hydrateStore: function () {
    TodoAPI.sailsReadTodos(function (data) {
      AppDispatcher.dispatch({
        actionType: TodoConstants.HYDRATE_STORE,
        data: data
      });
    });
  }

};

module.exports = TodoActions;