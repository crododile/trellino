window.Trellino.Collections.Lists = Backbone.Collection.extend({
  url: function(){
    return this.board.url() + "/lists";
  },
  model: Trellino.Models.List,

  initialize: function(options){
    this.board = options.board
  }
});

