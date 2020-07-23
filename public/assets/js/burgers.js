// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {


  function getBurgerData(category) {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/burgers" + categoryString, data => {

      console.log(data.burgers[0])
      for (let i = 0; i < data.burgers.length; i++) {
        const burgerInfo = $("<h5>");
        const demolishedButton = $("<button>");
        const deleteButton = $("<button>");

        burgerInfo.attr("id", "list-item-" + data.burgers[i].id);
        burgerInfo.text(data.burgers[i].name);
        burgerInfo.attr("value", data.burgers[i].id);

        deleteButton.text("x");
        deleteButton.addClass("delete btn btn-danger mr-3 delete-burger");
        

        if (data.burgers[i].demolished === 1) {
          // Wishlist
          deleteButton.data("data", data.burgers[i]);
          $("#burger-demolish-list").append(burgerInfo);
          $("#list-item-" + data.burgers[i].id).append(deleteButton);
        } else {
          // Demolish List
          deleteButton.data("data", data.burgers[i]);
          $("#burger-wishlist").append(burgerInfo);
          $("#list-item-" + data.burgers[i].id).append(deleteButton);
        
        }


      }
    });
  }
  getBurgerData();

  // Add burger
  $(".create-form").on("submit", function (event) {
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
      function () {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Move burger to Demolished
  $(".change-demolish").on("click", function (event) {
    let id = $(this).data("id");
    let newDemolish = $(this).data("newdemolish");

    let newDemolishState = {
      demolished: newDemolish
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDemolishState
    }).then(
      function () {
        console.log("changed demolish to", newDemolish);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Delete Burger
  $(".delete-burger").on("click", function (event) {
    let id = $(this).data("id");
    console.log(id)
    // Send the DELETE request.
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    }).then(
      function () {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});