window.Trellino.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],

  initialize: function(){
    this.listenTo( this.model, 'change sync', this.render );
  },

  events: {
    "click button.makeCard":"cardForm",
    "click button.removeList":"destroy",
  },


  destroy: function(){
    this.model.destroy();
    this.remove();
  },

  cardForm: function(){
    console.log('click');
    var newView = new Trellino.Views.CardsNew( { list: this.model } );
    newView.render();
    $('.formSpotCard').append(newView.$el);
  },

  render: function(){

    var renderedContent = this.template({
      list: this.model,
    });

    this.$el.html(renderedContent);

    return this
  },

});