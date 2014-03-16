window.Trellino.Views.Boards = Backbone.View.extend({
  template: JST['boards/index'],

  initialize: function(){
    this.listenTo(this.collection, 'sync remove', this.render );
  },

  events: {
    'click button.removeBoard':'removeBoard'
  },

  render: function(){
    var renderedContent = this.template(
      {
        boards: this.collection
      });

    this.$el.html(renderedContent);

    return this;
  },

  removeBoard: function(){
    console.log('click')
    event.preventDefault();
    var deadBoard = this.collection.findWhere({id: parseInt(event.target.id)})
    deadBoard.destroy();
  }


})