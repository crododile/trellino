window.Trellino.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],

  initialize: function(){
    this.listenTo( this.model, 'change', this.render );
  },

  events: {
    "click button.makeList":"cardForm",
    "click button.removeList":"destroy",
  },


  destroy: function(){
    this.model.destroy();
    this.remove();
  },

  cardForm: function(){
    console.log('click');
    var newView = new Trellino.Views.cardsNew( { list: this.model } );
    newView.render();
    $('.formSpot').append(newView.$el);
  },

  render: function(){

    var renderedContent = this.template({
      list: this.model,
    });

    this.$el.html(renderedContent);

    return this
  },

});