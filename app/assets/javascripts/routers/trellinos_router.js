Trellino.Routers.Rowter = Backbone.Router.extend({
  initialize: function(){
    console.log('GET ROWTY ')
  },

  routes: {
    '':'boardsIndex',
    'boards/new':'boardsNew',
  },

  boardsIndex: function(){
    var boards = Trellino.Collections.boards;

    var indexView = new Trellino.Views.Boards({
      collection: boards
    });

    boards.fetch({
      success: function () {
        indexView.render();
        $('#content.container').append(indexView.$el);
      }
    });

    indexView.render();
    $('#content.container').append(indexView.$el);
  },

  boardsNew: function(){
    var newView = new Trellino.Views.BoardsNew()

    newView.render();
    $('#content.container').append(newView.$el)
  }

});
