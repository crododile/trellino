window.Trellino.Views.BoardsShow = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function(){
    this.collection = window.Trellino.Collections.boards;
    this.listenTo( this.collection, 'sync', this.render );
    this.listenTo( this.model, 'sync', this.render );
  },

  events: {
    "click button":"addList",
  },

  render: function(){

    var renderedContent = this.template({

      board: this.model,
    //  list: this.list,
    });

    this.$el.html(renderedContent);

    return this
  },

  addList: function(){
    var lForm = new window.Trellino.Views.ListsNew();
    lForm.render();
    this.$el.append(lForm)
  }



});