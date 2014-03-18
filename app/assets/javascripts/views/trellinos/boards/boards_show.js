window.Trellino.Views.BoardsShow = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function(){
    this.openLists = [];
    this.subViews = [];
    this.cardCollections = {};
    this.collection = window.Trellino.Collections.boards;
    this.listenTo( this.collection, 'sync change', this.render );
    this.listenTo( this.model.lists(), 'add change remove', function(){ this.model.lists().sort();
      this.render() });
  },

  events: {
    "click button.makeList":"listForm",
    "click button.openList":"listShow",
    "click button.hideList":"listHide",
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
    var landedUI           = $(ui.item.parent()).data("id")

    if ( movedUI.attr("class") === "list_entry"){
      var movedModel         = this.model.lists().findWhere({"id": movedUI.data('id')});
    } else if ( movedUI.attr("class") === "card_entry"){

      var fromCollection = this.model.lists().findWhere({id: $(event.target).data("id")}).cards()
      var toCollection= this.model.lists().findWhere({id: $(ui.item.parent()).data("id")}).cards()

      var movedModel =  $.grep(fromCollection.models, function(e){ return e.id == movedUI.data("id"); })[0];


      fromCollection.remove(movedModel);
      toCollection.add(movedModel)
    }

    var newPredecessorRank = movedUI.prev().data("rank");
    var newSuccessorRank   = movedUI.next().data("rank");

    var newRank            = function(){
      if ( newPredecessorRank && newSuccessorRank ){
        return ( newPredecessorRank + newSuccessorRank ) / 2.0;
      } else if ( newPredecessorRank ){
        return newPredecessorRank + (1 - newPredecessorRank% Math.floor(newPredecessorRank) )/2.0
      } else if ( newSuccessorRank ){ return newSuccessorRank / 2.0 }
      else return 1
    }()

    movedUI.data("rank", newRank);


    if ( movedUI.attr("class") === "list_entry"){
       movedModel.save( { rank: newRank }, { patch: true } );
    } else if ( movedUI.attr("class") === "card_entry"){
       movedModel.save( {list_id: landedUI, rank: newRank }, { patch: true } );
    }

    this.setSortables();
  },

  setSortables: function(){
    $('.connectedLists').sortable( { connectWith: ".connectedLists" } );
    $('.connectedCards').sortable( { connectWith: ".connectedCards" } );
  },

  listHide: function(){

    targId = $(event.target).parent().data("id")

    for (var i = 0; i < this.openLists.length; i ++){
      if (this.openLists[i] === targId) this.openLists.splice(i,1)
    }

    $('[data-id='+targId+']').html(" <button class='openList'>" +
        $(event.target).parent().find('h2').text()
      + "</button>")

  },

  keepListsOpen: function(targId){

    var list = this.model.lists().findWhere( { 'id': targId} )

    var newView = new Trellino.Views.ListsShow({model: list});
    newView.render();

    this.subViews.push(newView);

    $('.list_entry[data-id='+targId+']').html(newView.$el);
    //make button, set class, set text

    var $button = $('<button>',{
      text: 'hide',
      class: 'hideList'
    })
    $('.list_entry[data-id='+targId+']').append($button);

    this.setSortables();
  },


  listShow: function(){


    targId = $(event.target).parent().data("id")

    var list = this.model.lists().findWhere( { 'id': targId } )

    var newView = new Trellino.Views.ListsShow({model: list});
    newView.render();

    $('.list_entry[data-id='+targId+']').html(newView.$el);
       //make button, set class, set text
       var $button = $('<button>',{
         text: 'hide',
         class: 'hideList'
       })
    $('.list_entry[data-id='+targId+']').append($button);


    this.setSortables();

    this.subViews.push(newView);

    this.cardCollections[newView.model.id] = newView.model.cards()

    this.openLists.push(targId)
  },

  render: function(){

    this.subViews.forEach(function(view){
      view.remove();
    })

    this.subViews = [];

    var renderedContent = this.template({
      board: this.model,
    });

    this.$el.html(renderedContent);

    var that = this

    this.openLists.forEach(function(lid){
      that.keepListsOpen(lid)
    });

    this.setSortables();

    return this
  },

});
