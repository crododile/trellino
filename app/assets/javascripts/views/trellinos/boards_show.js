window.Trellino.Views.BoardsShow = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function(){
    this.collection = window.Trellino.Collections.boards;
    this.listenTo( this.collection, 'sync change', this.render );
    this.listenTo( this.model.lists(), 'remove', this.render );
  },

  events: {
    "click button.makeList":"listForm",
    "click button.openList":"listShow",
  },

  listForm: function(){
    console.log('click');
    var newView = new Trellino.Views.ListsNew( { board: this.model } );
    newView.render();
    $('.formSpot').append(newView.$el);
  },

  listShow: function(){

    var targId = parseInt(event.target.id);
    var list = this.model.lists().where({'id': targId })[0];
    var newView = new Trellino.Views.ListsShow({model: list});
    newView.render();

    $('li#'+targId).html(newView.$el);

  },

  render: function(){

    var renderedContent = this.template({
      board: this.model,
    });

    this.$el.html(renderedContent);

    return this
  },

});