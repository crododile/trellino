window.Trellino.Views.BoardsShow = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function(){
    this.subviews = [];
    this.collection = window.Trellino.Collections.boards;
    this.listenTo( this.collection, 'sync change', this.render );
    this.listenTo( this.model.lists(), 'add change remove', function(){
      this.model.lists().sort(), this.render()
    });
  },

  events: {
    "click button.makeList":"listForm",
    "click button.openList":"listShow",
    "sortstop":"sortStuff"
  },

  listForm: function(){

    var newView = new Trellino.Views.ListsNew( { board: this.model } );

    newView.render();

    $('.formSpot').html(newView.$el);
    $('input.listTitle').focus();

  },

  sortStuff: function(event, ui){
    var movedUI            = ui.item;
    var landedUI           = event.target;

    debugger

    var movedModel         = this.model.lists().findWhere({"id": movedUI.data('id')});
    var newPredecessorRank = movedUI.prev().data("rank");
    var newSuccessorRank   = movedUI.next().data("rank");

    var newRank            = function(){
      if ( newPredecessorRank && newSuccessorRank ){
        return ( newPredecessorRank + newSuccessorRank ) / 2.0;
      } else if ( newPredecessorRank ){

        return newPredecessorRank * 1.1
      } else { return newSuccessorRank / 2.0 }
    }()

    movedUI.data("rank", newRank);

    movedModel.save( { rank: newRank }, { patch: true } )
  },

  setSortables: function(){
    $('.connectedLists').sortable( { connectWith: ".connectedLists" } );
    $('ul.connectedCards').sortable( { connectWith: ".connectedCards" } );
  },


  listShow: function(){
    targId = $(event.target).parent().data("id")

    var list = this.model.lists().findWhere( { 'id': targId } )

    var newView = new Trellino.Views.ListsShow({model: list});
    newView.render();

    $('[data-id='+targId+']').html(newView.$el);

    this.setSortables();
  },

  render: function(){

    var renderedContent = this.template({
      board: this.model,
    });

    this.$el.html(renderedContent);

    this.setSortables();

    return this
  },

});



// instantiateSubviews: function(){
//   var that = this
//   this.model.lists().forEach(function(list){
//     var newView = new Trellino.Views.ListsShow({model: list});
//     that.subviews.push(newView);
//   })
// },
//
// renderSubviews: function(){
//   var that  = this;
//   this.subviews.forEach(function(subV){
//     subV.render();
//     var $li = $("<li class='list_entry' id="+subV.model.id +">")
//     $li.html(subV.$el);
//
//     $('#lists').append($li);
//   })
// },
