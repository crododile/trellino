window.Trellino.Models.List = Backbone.Model.extend({
  urlRoot: "/boards/:id/lists",

  cards: function(){
    if (!this._cards){
      this._cards = new Trellino.Collections.Cards([], { list: this });
    }
    return this._cards;
  },

});