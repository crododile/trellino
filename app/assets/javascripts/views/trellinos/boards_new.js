window.Trellino.Views.BoardsNew = Backbone.View.extend({
  template: JST['boards/new'],

  events: {
    "click button.makeBoard":"makeBoard"
  },

  render: function(){
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this
  },

  makeBoard: function(){
    event.preventDefault();
    newB = new window.Trellino.Models.Board(
      { title: $('.boardTitle').val() }
    );
    newB.save( {},
      {
        success: function(){
          Trellino.Collections.boards.add(newB);
          Backbone.history.navigate('', { trigger:true });
        }
      }
    );
  },

});