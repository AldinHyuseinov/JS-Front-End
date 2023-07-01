function solve() {
  document.querySelector("#searchBtn").addEventListener("click", onClick);

  function onClick() {
    const search = document.getElementById("searchField");
    const searchValue = search.value.toLowerCase();

    if (searchValue === "" || searchValue === " ") {
      return;
    }

    Array.from(document.querySelectorAll("tbody tr")).forEach((tr) => {
      tr.className = "";
      const tableData = tr.children;
      const studentName = tableData[0].textContent.toLowerCase();
      const studentEmail = tableData[1].textContent.toLowerCase();
      const studentCourse = tableData[2].textContent.toLowerCase();

      if (
        studentName.includes(searchValue) ||
        studentEmail.includes(searchValue) ||
        studentCourse.includes(searchValue)
      ) {
        tr.className = "select";
      }
    });
    search.value = "";
  }
}
