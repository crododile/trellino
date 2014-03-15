Trellino.Routers.Rowter = Backbone.Router.extend({
  routes: {
    '':'boardsIndex',
    'boards/new':'boardsNew',
    'boards/:id/lists/new' : 'listForm',
    'boards/:id': 'boardsShow',

    'boards/:board_id/lists/:id' : 'listShow',
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

  boardsShow: function(id){
    var board = Trellino.Collections.boards.getOrFetch(id);


   // var list = Trellino.Collections.lists.whereOrFetch({ board_id: id });

    //var lists = board.lists
    var showView = new Trellino.Views.BoardsShow({
      model: board,
      //collection: lists,
    });
    this._swapView(showView);
  },

  listForm: function(){
    var newView = new Trellino.Views.ListsNew();
    newView.render();
    $('#content.container').append(newView.$el);
  },

  listShow: function(){

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
