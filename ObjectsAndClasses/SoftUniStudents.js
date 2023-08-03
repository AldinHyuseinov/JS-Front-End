function storeStudents(input) {
  const coursesAndStudents = input.reduce((acc, curr) => {
    if (curr.includes(":")) {
      const [courseName, capacity] = curr.split(": ");
      const capacityCount = Number(capacity);

      if (!acc.hasOwnProperty(courseName)) {
        acc[courseName] = {
          capacity: capacityCount,
          students: [],
        };
      } else {
        acc[courseName].capacity += capacityCount;
      }

      return acc;
    }

    const [usernameAndCredits, emailAndCourseName] = curr.split(" with email ");
    const replace = usernameAndCredits.replace("[", " ").replace("]", " ");
    const [username, credits] = replace.split(" ");

    const [email, courseName] = emailAndCourseName.split(" joins ");

    if (acc.hasOwnProperty(courseName)) {
      if (acc[courseName].capacity >= 1) {
        acc[courseName].students.push({ credits, username, email });
        acc[courseName].capacity -= 1;
      }
    }

    return acc;
  }, {});

  Object.entries(coursesAndStudents)
    .sort(([_, a], [__, b]) => b.students.length - a.students.length)
    .forEach(([courseName, { capacity, students }]) => {
      console.log(`${courseName}: ${capacity} places left`);

      students
        .sort((a, b) => b.credits - a.credits)
        .forEach(({ credits, username, email }) => {
          console.log(`--- ${credits}: ${username}, ${email}`);
        });
    });
}

storeStudents([
  "JavaBasics: 2",
  "user1[25] with email user1@user.com joins C#Basics",
  "C#Advanced: 3",
  "JSCore: 4",
  "user2[30] with email user2@user.com joins C#Basics",
  "user13[50] with email user13@user.com joins JSCore",
  "user1[25] with email user1@user.com joins JSCore",
  "user8[18] with email user8@user.com joins C#Advanced",
  "user6[85] with email user6@user.com joins JSCore",
  "JSCore: 2",
  "user11[3] with email user11@user.com joins JavaBasics",
  "user45[105] with email user45@user.com joins JSCore",
  "user007[20] with email user007@user.com joins JSCore",
  "user700[29] with email user700@user.com joins JSCore",
  "user900[88] with email user900@user.com joins JSCore",
]);
