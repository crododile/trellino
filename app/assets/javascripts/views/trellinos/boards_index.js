window.Trellino.Views.Boards = Backbone.View.extend({
  template: JST['boards/index'],

  // events: {
  //   'click button':'removeBoard'
  // },

  render: function(){
    var renderedContent = this.template(
      {
        boards: this.collection
      });

    this.$el.html(renderedContent);

    return this;
  },

  // removeBoard: function(){
  //   console.log('click')
  //   event.preventDefault();
  //   debugger
  // }


})