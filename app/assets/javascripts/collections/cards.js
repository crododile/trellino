window.Trellino.Collections.Cards = Backbone.Collection.extend({
  url: function(){

  },
  model: Trellino.Models.Card,

  initialize: function(options){
    this.list = options.list
  }
});

