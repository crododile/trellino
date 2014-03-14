window.Trellino.Views.BoardsShow = Backbone.View.extend({
  template: JST['boards/show'],

  events: {

  },

  render: function(){
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this
  },



});