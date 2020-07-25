// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  
  function getBurgerData(category) {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/burgers" + categoryString, data => {
      // Dynamic js to compose lists when data is returned from db
      let wishlistCount = [];
      let demolishedListCount = [];

      for (let i = 0; i < data.burgers.length; i++) {
        const burgerInfo = $("<h5>");
        burgerInfo.attr("id", "list-item-" + data.burgers[i].id);
        burgerInfo.text(data.burgers[i].name);

        const deleteButton = $("<button>");
        deleteButton.text("x");
        deleteButton.addClass("btn btn-outline-danger delete");
        deleteButton.attr("id", "delete-burger");
        deleteButton.attr("value", data.burgers[i].id);

        const demolishedButton = $("<button>");
        demolishedButton.text("Demolish");
        demolishedButton.addClass("btn btn-outline ml-2 demolish");
        demolishedButton.data("data", data.burgers[i]);

        if (data.burgers[i].demolished === 1) {
          // Demolish List
          demolishedListCount.push(data.burgers.id)
          $("#burger-demolish-list").append(burgerInfo);
          $("#list-item-" + data.burgers[i].id).append(deleteButton);
        } else {
          // Wishlist
          wishlistCount.push(data.burgers.id)
          $("#burger-wishlist").append(burgerInfo);
          $("#list-item-" + data.burgers[i].id).append(demolishedButton);
          $("#list-item-" + data.burgers[i].id).append(deleteButton);
        };
      };
      // Wishlist/Demolished List empty, then show message
      if (wishlistCount.length === 0) {
        $("#burger-wishlist").text("Add boigas to your Wishlist!");
      };
      if (demolishedListCount.length === 0) {
        $("#burger-demolish-list").text("Add boigas to your Wishlist and then demolish them!");
      };
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

  // Update burger to Demolished
  $(document).on("click", "button.demolish", handleBurgerDemolish);

  function handleBurgerDemolish() {
    const currentDemolish = $(this).data("data");
    demolishBurger(currentDemolish)
  };

  function demolishBurger(data) {
    let id = data.id;
    let newDemolish = 1;

    let newDemolishState = {
      id: data.id,
      name: data.name,
      demolished: newDemolish
    };
    console.log(newDemolishState);
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
  };

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

// mo.js
const burst = new mojs.Burst({
  parent: '.hiddenDiv',
  radius: { 30: 0 },
  count: 150,
  children: {
    shape: 'circle',
    points: 200,
    fill: { '#FF331F': '#FF8F52' },
    angle: { 360: 0 },
    duration: 100,
    delay: 'stagger( rand(0, 200) )'
  }
});

$(document).on("click", function (e) {
  burst
    .tune({ x: 0, y: -275 })
    .setSpeed(100)
    .replay();
});