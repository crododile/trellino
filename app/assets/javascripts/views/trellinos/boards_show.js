window.Trellino.Views.BoardsShow = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function(){
    this.subviews = [],
    this.collection = window.Trellino.Collections.boards;
    this.listenTo( this.collection, 'sync change', this.render );
    this.listenTo( this.model.lists(), 'add remove', this.render );
  },

  events: {
    "click button.makeList":"listForm",
    "click button.openList":"listShow",
  },

  listForm: function(){

    var newView = new Trellino.Views.ListsNew( { board: this.model } );
    $(event.target).addClass('disabled')
    newView.render();

    $('.formSpot').html(newView.$el);
    $('input.listTitle').focus();

  },

  setSortables: function(){

    $('#lists').sortable( { connectWith: ".connectedLists"} );
    $('ul#cards').sortable( { connectWith: ".connectedCards"} );
  },


  instantiateSubviews: function(){
    var that = this
    this.model.lists().forEach(function(list){
      var newView = new Trellino.Views.ListsShow({model: list});
      that.subviews.push(newView);
    })
  },

  renderSubviews: function(){
    var that  = this;
    this.subviews.forEach(function(subV){
      subV.render();
      var $li = $("<li class='list_entry' id="+subV.model.id +">")
      $li.html(subV.$el);

      $('#lists').append($li);
    })
  },

  listShow: function(){

    var targId = parseInt(event.target.id);
    var list = this.model.lists().where({'id': targId })[0];
    var newView = new Trellino.Views.ListsShow({model: list});
    newView.render();

    $('li#'+targId).html(newView.$el);

    this.setSortables();
  },

  render: function(){

    var renderedContent = this.template({
      board: this.model,
    });

    this.$el.html(renderedContent);

    // this.instantiateSubviews();
    // this.renderSubviews();


    return this
  },

});