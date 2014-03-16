window.Trellino.Views.ListsNew = Backbone.View.extend({
  template: JST["lists/new"],

  events: {
    'click button': 'makeList'
  },

  makeList: function(){
     console.log('click')
    event.preventDefault();
    var params = $(event.currentTarget.children).serializeJSON()
    newB = new window.Trellino.Models.List(
      params
    );
    newB.save( {},
      {
        success: function(){
          Trellino.Collections.boards.add(newB);
          Backbone.history.navigate('', { trigger:true });
        }
      }
    );
  },


  render: function(){
    var renderedContent = this.template({board: this.model});

    this.$el.html(renderedContent);

    return this
  },

});