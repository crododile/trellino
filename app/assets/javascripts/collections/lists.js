window.Trellino.Collections.List = Backbone.Collection.extend({
  url: "/boards/:id/lists",
  model: Trellino.Models.List,


  // whereOrFetch: function( options ){
//     var found = this.where(options);
//     if( found ) return found;
//     var that = this;
//     this.fetch({
//       success: function(){
//         return that.where(options)
//       }
//     });
//   }
});

window.Trellino.Collections.lists = new window.Trellino.Collections.List();

