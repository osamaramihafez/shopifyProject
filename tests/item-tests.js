const utils = require("./utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const apiPATCH = utils.apiPATCH;
const apiDELETE = utils.apiDELETE;
const moment = require("moment");
const setup = require("./setup");
const seedData = setup.seedData;

function itemTests() {
  it("getting a item's information", async () => {
    let item_a = seedData.item[0];

    const resp1 = await apiGET(`/item/1`);
    let item_b = resp1.data.data[0];
    checkMatch(item_a, item_b);
    expect(resp1.data.success).toEqual(true);
  });

  it("getting all items", async () => {
    let item_a = seedData.item[0];

    const resp1 = await apiGET(`/items`);
    let item_b = resp1.data.data[0];
    checkMatch(item_a, item_b);
    expect(resp1.data.success).toEqual(true);
  });

  it("creating a item", async () => {
    let new_item = {
      item_title: "amazing title #x",
      item_description: "this is a thing you can place in your humble abode",
      item_quantity: 49,
      sale_date: new moment(new Date("2021-5-28")).format("YYYY-MM-DD"),
      item_tag: "Boots",
    };

    let resp1 = await apiPOST(`/item`, new_item);
    let item = resp1.data.data[0];
    checkMatch(new_item, item);
    expect(resp1.data.success).toEqual(true);
  });

  it("getting a item by it's date", async () => {
    let itemA = seedData.item[0];

    const resp1 = await apiGET(
      `/items?property=sale_date&operator=eq&value=${itemA.sale_date}`
    );
    let itemB = resp1.data.data[0];
    checkMatch(itemA, itemB);
    expect(resp1.data.success).toEqual(true);
  });

  it("updating a item", async () => {
    let new_item = {
      item_id: 1,
      item_title: "different title",
      item_description: "we want a different desc",
      item_quantity: 49,
      sale_date: new moment(new Date("2021-5-28")).format("YYYY-MM-DD"),
      item_tag: "Boots",
    };

    let resp1 = await apiGET(`/item/1`);
    let original_item = resp1.data.data[0];
    expect(original_item.item_id).toEqual(new_item.item_id);
    expect(original_item.item_title).not.toEqual(new_item.item_title);
    expect(original_item.item_description).not.toEqual(
      new_item.item_description
    );
    expect(original_item.item_quantity).not.toEqual(new_item.item_quantity);

    await apiPATCH(`/item`, new_item);
    let resp2 = await apiGET(`/item/1`);
    expect(resp2.data.data[0].item_id).toEqual(new_item.item_id);
    checkMatch(new_item, resp2.data.data[0]);
    expect(resp2.data.success).toEqual(true);
  });

  it("delete a item", async () => {
    let resp = await apiGET(`/item/4`);
    let resp1 = await apiDELETE(`/item/4`);
    // We want to ensure that the deleted item is the correct item.
    expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
    expect(resp1.data.success).toEqual(true);

    let resp2 = await apiGET(`/item/4`);
    expect(resp2.data.ecode).toEqual(3); // Ecode 3 implies None found (i.e. DNE)
    expect(resp2.data.success).toEqual(false);
  });
}

function checkMatch(item_a, item_b) {
  expect(item_a.item_title).toEqual(item_b.item_title);
  expect(item_a.item_description).toEqual(item_b.item_description);
  expect(item_a.item_quantity).toEqual(item_b.item_quantity);
}

module.exports = {
  itemTests: itemTests,
};
