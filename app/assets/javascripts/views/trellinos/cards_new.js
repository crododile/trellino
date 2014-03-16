window.Trellino.Views.CardsNew = Backbone.View.extend({
  template: JST["cards/new"],

  events: {
    'click button.addCard': 'makeCard'
  },

  initialize: function(options){
    this.list = options.list;
  },

  makeCard: function(){
     console.log('click')
    event.preventDefault();
    var params = $(event.currentTarget.children).serializeJSON()
    newB = new window.Trellino.Models.Card(
      params
    );

    var that = this
    newB.save( {},
      {
        success: function(){
          that.list.cards().add(newB);
        }
      }
    );
  },


  render: function(){
    var renderedContent = this.template({list: this.list});

    this.$el.html(renderedContent);

    return this
  },

});