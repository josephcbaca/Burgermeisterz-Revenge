// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Add burger
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    let newBurger = {
      name: $("#ca").val().trim(),
      demolished: 0
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Move burger to Demolished
  $(".change-demolish").on("click", function(event) {
    let id = $(this).data("id");
    let newDemolish = $(this).data("newdemolish");

    let newDemolishState = {
      demolished: 1
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDemolishState
    }).then(
      function() {
        console.log("changed demolish to", newDemolish);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

// Delete Burger
  $(".delete-burger").on("click", function(event) {
    let id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
