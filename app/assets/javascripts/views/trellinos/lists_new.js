window.Trellino.Views.ListsNew = Backbone.View.extend({
  template: JST["lists/new"],

  render: function(){
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this
  },

});