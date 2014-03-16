window.Trellino.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],

  initialize: function(){
    //this.listenTo( this.model, 'sync change', this.render );
  },

  events: {
    "click button.makeList":"cardForm",
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