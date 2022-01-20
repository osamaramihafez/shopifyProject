// This is the file where we handle user input from the frontend.

// Because we are using the backend server name alias is logistics
const API = "http://localhost:3001/api";

$(document).ready(function () {
  $("#alert").hide();
});

function create() {
  $("#items").empty();
  $("#items").hide();
  $.ajax({
    url: `${API}/item`,
    data: {
      item_title: $("#item_title").val(),
      item_description: $("#item_description").val(),
      item_quantity: $("#item_quantity").val(),
      sale_date: new Date($("#sale_date").val())
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      item_tag: $("#item_tag").val(),
    },
    type: "POST",
    dataType: "text json",
  })
    .done((data) => {
      console.log(data);
      console.log(data.error);
      $("#success").html(data.success);
      if (data.success == true) {
        $("#alert").slideDown();
        displayItems([data.data[0]]);
      } else {
        $("#alert").html(data.error);
        $("#alert").slideDown();
      }
    })
    .catch((error) => {
      console.log(error.responseJSON.error);
      $("#alert").html(error.responseJSON.error);
      $("#alert").slideDown();
    });
}

function retrieve() {
  $("#items").empty();
  $("#items").hide();
  $.ajax({
    url: `${API}/item/${$("#item_id").val()}`,
    type: "GET",
    dataType: "text json",
  })
    .done((data) => {
      console.log(data);
      console.log(data.error);
      $("#success").html(data.success);
      if (data.success == true) {
        $("#alert").slideDown();
        displayItems([data.data[0]]);
      } else {
        $("#alert").html(data.error);
        $("#alert").slideDown();
      }
    })
    .catch((error) => {
      console.log(error.responseJSON.error);
      $("#alert").html(error.responseJSON.error);
      $("#alert").slideDown();
    });
}

function update() {
  $("#items").empty();
  $("#items").hide();
  $.ajax({
    url: `${API}/item/`,
    body: {
      item_id: $("#item_id").val(),
      item_title: $("#item_title").val(),
      item_description: $("#item_description").val(),
      item_quantity: $("#item_quantity").val(),
      sale_date: new Date($("#sale_date").val())
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      item_tag: $("#item_tag").val(),
    },
    type: "PATCH",
    dataType: "text json",
  })
    .done((data) => {
      console.log(data);
      console.log(data.error);
      $("#success").html(data.success);
      if (data.success == true) {
        $("#alert").slideDown();
        displayItems([data.data[0]]);
      } else {
        $("#alert").html(data.error);
        $("#alert").slideDown();
      }
    })
    .catch((error) => {
      console.log(error.responseJSON.error);
      $("#alert").html(error.responseJSON.error);
      $("#alert").slideDown();
    });
}

function remove() {
  $("#items").empty();
  $("#items").hide();
  $.ajax({
    url: `${API}/item/${$("#item_id").val()}`,
    type: "DELETE",
    dataType: "text json",
  })
    .done((data) => {
      console.log(data);
      console.log(data.error);
      $("#success").html(data.success);
      if (data.success == true) {
        $("#alert").slideDown();
        displayItems([data.data[0]]);
      } else {
        $("#alert").html(data.error);
        $("#alert").slideDown();
      }
    })
    .catch((error) => {
      console.log(error.responseJSON.error);
      $("#alert").html(error.responseJSON.error);
      $("#alert").slideDown();
    });
}

function filter() {}

function displayItems(items) {
  // Items is a list of item objects
  let item;
  for (var i = 0; i < items.length; i++) {
    item = items[i];
    item_html = $(`<div class="an_item" id="${item.item_id}"></div>`);
    item_html.append(`<p id="item_title"> ${item.item_title} </p>`);
    item_html.append(`<p id="item_description"> ${item.item_description} </p>`);
    item_html.append(`<p id="item_quantity"> ${item.item_quantity} </p>`);
    item_html.append(`<p id="sale_date"> ${item.sale_date} </p>`);
    item_html.append(`<p id="item_tag"> ${item.item_tag} </p>`);
    $("#items").append(item_html);
  }
  $("#items").slideDown();
}
