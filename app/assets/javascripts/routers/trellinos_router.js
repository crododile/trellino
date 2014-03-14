Trellino.Routers.Rowter = Backbone.Router.extend({
  routes: {
    '':'boardsIndex',
    'boards/new':'boardsNew',
    'boards/:id': 'boardsShow',
  },

  boardsIndex: function(){
    var boards = Trellino.Collections.boards;

    var indexView = new Trellino.Views.Boards({
      collection: boards
    });

    boards.fetch({
      success: function () {
        indexView.render();
        $('#content.container').html(indexView.$el);
      }
    });

    this._swapView(indexView);
  },

  boardsNew: function(){
    var newView = new Trellino.Views.BoardsNew();
    newView.render();
    $('#content.container').append(newView.$el);
  },

  boardsShow: function(){
    var showView = new Trellino.Views.BoardsShow();
    this._swapView(showView);
  },

  _swapView: function(view){
    if(this.currentView){
      this.currentView.remove();
    }
    this.currentView = view;
    view.render();
     $('#content.container').html(view.$el);
  }

});
