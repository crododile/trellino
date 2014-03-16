window.Trellino.Views.BoardsShow = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function(){
    this.collection = window.Trellino.Collections.boards;
    this.listenTo( this.collection, 'sync', this.render );
    this.listenTo( this.model, 'sync change', this.render );
  },

  events: {
    "click button.makeList":"listForm",
  },

  listForm: function(){
    console.log('click');
    var newView = new Trellino.Views.ListsNew( { board: this.model } );
    newView.render();
    $('.formSpot').append(newView.$el);
  },

  render: function(){
    var renderedContent = this.template({
      board: this.model,
    });

    this.$el.html(renderedContent);

    return this
  },

});