window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: "/boards",

  lists: function(){
    if (!this._lists){
      this._lists = new Trellino.Collections.Lists([], { board: this });
    }
    return this._lists;
  },

  parse: function(jsonResp){

    if (jsonResp.lists){
      this.lists().set(jsonResp.lists);

      this.lists().each(function(list){

        list.cards().set(list.get('cards'));
      })

      delete jsonResp.lists;
    }

    return jsonResp;
  }
})