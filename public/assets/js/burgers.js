// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $.ajax("/burgers", {
      type: "GET"
    }).then(function(data) {
      var eatenBurg = $("#eatenBurger");
      var noteatenBurg = $("#notEatenBurger");
  
      var burgers = data.burgers;
      var len = burgers.length;
  
      for (var i = 0; i < len; i++) {
        var new_elem =
          "<li>" +
          burgers[i].id + 
          ". "+burgers[i].name +
          "<button class='change-state' data-id='" +
          burgers[i].id +
          "' data-newburg='" +
          !burgers[i].sleepy +
          "'>";
  
        if (burgers[i].sleepy) {
          new_elem += "NomNomNom";
        } 
  
        new_elem += "</button>";
  
        new_elem +=
          "<button class='delete-burger' data-id='" +
          burgers[i].id +
          "'>DELETE!</button></li>";
  
        if (burgers[i].sleepy) {
          eatenBurg.append(new_elem);
        } else {
          noteatenBurg.append(new_elem);
        }
      }
    });
  
    $(document).on("click", ".change-state", function(event) {
      var id = $(this).data("id");
      var newBurg = $(this).data("newBurg")===true;
  
      var newBurgState = {
        sleepy: newBurg
      };
  
      // Send the PUT request.
      $.ajax("/burgers/" + id, {
        type: "PUT",
        data: JSON.stringify(newBurgState),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("changed sleep to", newBurg);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        name: $("#ca")
          .val()
          .trim(),
        isDevoured: $("[name=devoured]:checked")
          .val()
          .trim()
      };
  
      // Send the POST request.
      $.ajax("/burgers", {
        type: "POST",
        data: JSON.stringify(newCat),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(document).on("click", ".delete-burger", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/burgers/" + id, {
        type: "DELETE"
      }).then(function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  });
  