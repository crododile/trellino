window.Trellino.Views.BoardsShow = Backbone.View.extend({
  template: JST['boards/show'],


  events: {
    "click button":"addList"
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
   console.log('click')
    var lForm = new window.Trellino.Views.ListsNew();
    lForm.render();
    this.$el.append(lForm)
  }



});