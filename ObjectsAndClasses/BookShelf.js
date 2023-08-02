function storeInformation(input) {
  const shelvesAndBook = input.reduce((acc, curr) => {
    if (curr.includes("->")) {
      const [shelfId, shelfGenre] = curr.split(" -> ");

      if (!acc.hasOwnProperty(shelfId)) {
        acc[shelfId] = {
          shelfGenre,
          books: [],
          totalBookCount: 0,
        };
      }
      return acc;
    }

    const [bookTitleAndAuthor, bookGenre] = curr.split(", ");
    const shelf = Object.values(acc).find((value) => value.shelfGenre === bookGenre);

    if (shelf) {
      const [bookTitle, bookAuthor] = bookTitleAndAuthor.split(": ");
      shelf.books.push({ bookTitle, bookAuthor });
      shelf.totalBookCount += 1;
    }

    return acc;
  }, {});

  Object.entries(shelvesAndBook)
    .sort(([_, a], [__, b]) => b.totalBookCount - a.totalBookCount)
    .forEach(([shelfId, { shelfGenre, books, totalBookCount }]) => {
      console.log(`${shelfId} ${shelfGenre}: ${totalBookCount}`);

      books
        .sort((a, b) => a.bookTitle - b.bookTitle)
        .forEach(({ bookTitle, bookAuthor }) => {
          console.log(`--> ${bookTitle}: ${bookAuthor}`);
        });
    });
}

storeInformation([
  "1 -> history",
  "1 -> action",
  "Death in Time: Criss Bell, mystery",
  "2 -> mystery",
  "3 -> sci-fi",
  "Child of Silver: Bruce Rich, mystery",
  "Hurting Secrets: Dustin Bolt, action",
  "Future of Dawn: Aiden Rose, sci-fi",
  "Lions and Rats: Gabe Roads, history",
  "2 -> romance",
  "Effect of the Void: Shay B, romance",
  "Losing Dreams: Gail Starr, sci-fi",
  "Name of Earth: Jo Bell, sci-fi",
  "Pilots of Stone: Brook Jay, history",
]);
