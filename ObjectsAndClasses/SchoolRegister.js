function processStudents(input) {
  const studentsObj = input.reduce((acc, curr) => {
    const [studentName, grade, averageScore] = curr
      .split(", ")
      .map((studentInfo) => studentInfo.split(": ")[1]);

    if (averageScore < 3) {
      return acc;
    }

    const nextYearGrade = Number(grade) + 1;

    if (!acc.hasOwnProperty(nextYearGrade)) {
      acc[nextYearGrade] = {
        students: [],
        totalScore: 0,
        calculateAverageAnnualScore() {
          return (this.totalScore / this.students.length).toFixed(2);
        },
      };
    }

    acc[nextYearGrade].students.push(studentName);
    acc[nextYearGrade].totalScore += Number(averageScore);

    return acc;
  }, {});

  Object.entries(studentsObj).forEach(([grade, { students }]) => {
    console.log(`${grade} Grade`);
    console.log(`List of students: ${students.join(", ")}`);
    console.log(
      `Average annual score from last year: ${studentsObj[grade].calculateAverageAnnualScore()}\n`
    );
  });
}

processStudents([
  "Student name: Mark, Grade: 8, Graduated with an average score: 4.75",
  "Student name: Ethan, Grade: 9, Graduated with an average score: 5.66",
  "Student name: George, Grade: 8, Graduated with an average score: 2.83",
  "Student name: Steven, Grade: 10, Graduated with an average score: 4.20",
  "Student name: Joey, Grade: 9, Graduated with an average score: 4.90",
  "Student name: Angus, Grade: 11, Graduated with an average score: 2.90",
  "Student name: Bob, Grade: 11, Graduated with an average score: 5.15",
  "Student name: Daryl, Grade: 8, Graduated with an average score: 5.95",
  "Student name: Bill, Grade: 9, Graduated with an average score: 6.00",
  "Student name: Philip, Grade: 10, Graduated with an average score: 5.05",
  "Student name: Peter, Grade: 11, Graduated with an average score: 4.88",
  "Student name: Gavin, Grade: 10, Graduated with an average score: 4.00",
]);

processStudents([
  "Student name: George, Grade: 5, Graduated with an average score: 2.75",
  "Student name: Alex, Grade: 9, Graduated with an average score: 3.66",
  "Student name: Peter, Grade: 8, Graduated with an average score: 2.83",
  "Student name: Boby, Grade: 5, Graduated with an average score: 4.20",
  "Student name: John, Grade: 9, Graduated with an average score: 2.90",
  "Student name: Steven, Grade: 2, Graduated with an average score: 4.90",
  "Student name: Darsy, Grade: 1, Graduated with an average score: 5.15",
]);
