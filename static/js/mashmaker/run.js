/**
 * Created by nicholas on 11/16/13.
 */
// An example Backbone application contributed by
// [JÃ©rÃ´me Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.
"use strict";
// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Song Model
  // ----------

  // Our basic **Song** model has `title`, `order`, and `done` attributes.
  var Song = Backbone.Model.extend({

    url: "../song/",

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: "",
        order: 0,//Song.nextOrder(),
        done: false
      };
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }

  });

  // Song Collection
  // ---------------

  // The collection of songs is backed by *localStorage* instead of a remote
  // server.
  var SongList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Song,

    // Save all of the song items under the `"songs-backbone"` namespace.
    //localStorage: new Backbone.LocalStorage("songs-backbone"),

    // Filter down the list of all song items that are finished.
    done: function() {
      return this.where({done: true});
    },

    // Filter down the list to only song items that are still not finished.
    remaining: function() {
      return this.where({done: false});
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },




    // Todos are sorted by their original insertion order.
    comparator: 'order'

  });

  // Create our global collection of **Todos**.
  var AllSongs = new SongList;

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
//  var SongView = Backbone.View.extend({
//
//    //... is a list tag.
//    tagName:  "li",
//
//    // Cache the template function for a single item.
//    template: _.template($('#item-template').html()),
//
//
//    // The TodoView listens for changes to its model, re-rendering. Since there's
//    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
//    // app, we set a direct reference on the model for convenience.
//    initialize: function() {
//      //this.listenTo(this.model, 'change', this.render);
//      this.listenTo(this.model, 'destroy', this.remove);
//
//
//    },
//
//    // Re-render the titles of the todo item.
//    render: function() {
//      this.$el.html(this.template(this.model.toJSON()));
//      this.$el.toggleClass('done', this.model.get('done'));
//      this.input = this.$('.edit');
//      return this;
//    },
//
//    // Toggle the `"done"` state of the model.
//    toggleDone: function() {
//      this.model.toggle();
//    },
//
//  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#songapp"),

    initialize: function() {
          this.getUpdates().done(function() {
              this.playSongs();
          });
    },

    playSongs: function() {
        var song = AllSongs.pop();
        $('#player').src(song.src).play();
        console.log("playSongs");

        $('#player').bind('ended', function() {
            this.playSongs();
        });

    },

    getUpdates: function() {
        var song = new Song;
        song.id = 1;
        var done = song.fetch({success: function() {
            AllSongs.add(song, {at: 0});
            this.getUpdates();
        }.bind(this)});

        var done = song.fetch();

        console.log("getUpdates");

        return done;
    }



    // Add a single todo item to the list by creating a view for it, and
//    // appending its element to the `<ul>`.
//    addOne: function(song) {
//      var view = new SongView({model: song});
//      this.$("#song-list").append(view.render().el);
//      return view;
//    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});