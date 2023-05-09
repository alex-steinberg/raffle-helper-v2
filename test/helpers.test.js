import { drawWinners, Entry } from "../common/helpers";

const list = [
  {
    id: 1,
    email: "email1",
    first_name: "John",
    last_name: "Doe",
    entry_id: 1,
  },
  {
    id: 2,
    email: "email2",
    first_name: "John",
    last_name: "Doe",
    entry_id: 1,
  },
  {
    id: 3,
    email: "email3",
    first_name: "John",
    last_name: "Doe",
    entry_id: 1,
  },
  {
    id: 4,
    email: "email4",
    first_name: "John",
    last_name: "Doe",
    entry_id: 1,
  },
  {
    id: 5,
    email: "email5",
    first_name: "John",
    last_name: "Doe",
    entry_id: 1,
  },
  {
    id: 6,
    email: "email6",
    first_name: "John",
    last_name: "Doe",
    entry_id: 1,
  },
  {
    id: 7,
    email: "email7",
    first_name: "John",
    last_name: "Doe",
    entry_id: 1,
  },
];
test("drawWinners draws the correct number of winners", () => {
  expect(drawWinners(list, 1).length).toBe(1);
  expect(drawWinners(list, 5).length).toBe(5);
  expect(drawWinners(list, 10).length).toBe(10);
});

test("drawEmails returns no duplicates", () => {
  const result = drawWinners(list, 5);
  const setOfUniques = new Set(result);
  expect(result.length).toBe(setOfUniques.size);
});
