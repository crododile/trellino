window.Trellino.Views.CardsNew = Backbone.View.extend({
  template: JST["cards/new"],

  events: {
     'blur form.cardForm' : 'makeCard'
  },

  initialize: function(options){
    this.list = options.list;
  },

  closeForm: function(){
    this.remove();
  },

  makeCard: function(){
    event.preventDefault();

    var params = $(event.target).parent().parent().serializeJSON()

    newB = new window.Trellino.Models.Card(
      params
    );

    var that = this
    newB.save( {},
      {
        success: function(){
          that.list.cards().add(newB);
        },
        error: function(){
			$('button.makeCard').show();
           that.closeForm();
        },
      }
    );
  },


  render: function(){
    var renderedContent = this.template({list: this.list});

    this.$el.html(renderedContent);

    return this
  },

});