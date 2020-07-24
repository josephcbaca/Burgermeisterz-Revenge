// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  function getBurgerData(category) {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/burgers" + categoryString, data => {
      for (let i = 0; i < data.burgers.length; i++) {

        const burgerInfo = $("<h5>");
        burgerInfo.attr("id", "list-item-" + data.burgers[i].id);
        burgerInfo.text(data.burgers[i].name);

        const deleteButton = $("<button>");
        deleteButton.text("x");
        deleteButton.addClass("delete btn btn-outline-danger");
        deleteButton.attr("id", "delete-burger");
        deleteButton.attr("value", data.burgers[i].id);

        const demolishedButton = $("<button>");
        demolishedButton.text("Demolish");
        demolishedButton.addClass("delete btn btn-outline-success ml-2");

        if (data.burgers[i].demolished === 1) {
          // Wishlist
          $("#burger-demolish-list").append(burgerInfo);
        } else {
          // Demolish List
          $("#burger-wishlist").append(burgerInfo);
        }
        $("#list-item-" + data.burgers[i].id).append(demolishedButton);    
        $("#list-item-" + data.burgers[i].id).append(deleteButton);
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
    let id = $(this).attr("data", "id");
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
  $(document).on("click", "button.delete", handleBurgerDelete);

  function handleBurgerDelete() {
    const currentDelete = $(this).attr("value");
    console.log(currentDelete)
    deleteBurger(currentDelete)
  };

  function deleteBurger(id) {
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
  };
});