window.Trellino.Collections.Boards = Backbone.Collection.extend({
  url: "/boards",
  model: Trellino.Models.Board,

  getOrFetch: function(id){
    var found = this.get(id)
    if( found ) return found;

    var that = this
    var dummy = new Trellino.Models.Board( {id: id} );
    dummy.fetch();
    this.fetch( id, { success: that.add(dummy) } );
    return dummy;
  }
})

window.Trellino.Collections.boards = new Trellino.Collections.Boards();