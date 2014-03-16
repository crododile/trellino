window.Trellino.Views.ListsNew = Backbone.View.extend({
  template: JST["lists/new"],

  events: {
    'click button.addList': 'makeList'
  },

  initialize: function(options){
    this.board = options.board;
  },

  makeList: function(){
     console.log('click')
    event.preventDefault();
    var params = $(event.currentTarget.children).serializeJSON()
    newB = new window.Trellino.Models.List(
      params
    );

    var that = this
    newB.save( {},
      {
        success: function(){
          that.board.lists().add(newB);
          that.board.trigger('sync');
        }
      }
    );
  },


  render: function(){
    var renderedContent = this.template({board: this.board});

    this.$el.html(renderedContent);

    return this
  },

});