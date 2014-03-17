window.Trellino.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],

  initialize: function(){
    this.listenTo( this.model, 'change sync remove', this.render );
    this.listenTo( this.model.cards(), 'add remove', this.render )
  },

  events: {
    "click button.makeCard":"cardForm",
    "click button.removeList":"destroyList",
    "click button.removeCard":"destroyCard",
  },


  setSortables: function(){

    $('#lists').sortable( { connectWith: ".connectedLists" } );
    $('ul#cards').sortable( { connectWith: ".connectedCards" } );
  },


  destroyCard: function(){
    event.preventDefault();
    var deadCardWalking = this.model.cards().findWhere({ id: parseInt(event.target.id) });

    deadCardWalking.destroy();
    this.render();
  },


  destroyList: function(){
    var that = this;
    this.model.destroy({
    });
   this.remove();
  },

  cardForm: function(){
      var newView = new Trellino.Views.CardsNew( { list: this.model } );
      newView.render();
      this.$('div.formSpotCard').append(newView.$el);
      $('input.cardTitle').focus();
  },

  render: function(){

    var renderedContent = this.template({
      list: this.model,
    });

    this.$el.html(renderedContent);

    this.setSortables();

    return this
  },

});