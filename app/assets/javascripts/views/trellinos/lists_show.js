window.Trellino.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],

  initialize: function(){
    this.listenTo( this.model, 'change sync', this.render );
    this.listenTo( this.model.cards(), 'add remove', this.render )
  },

  events: {
    "click button.makeCard":"cardForm",
    "click button.removeList":"destroyList",
    "click button.removeCard":"destroyCard",
  },

  destroyCard: function(){
    event.preventDefault();
    var deadCardWalking = this.model.cards().findWhere({ id: parseInt(event.target.id) });

    deadCardWalking.destroy();
    this.render();
  },


  destroyList: function(){
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