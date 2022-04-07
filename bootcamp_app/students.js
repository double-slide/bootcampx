const { Pool } = require('pg');

const args = process.argv.slice(2);
const cohortMonth = args[0];
const numberOfResults = args[1];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id as students_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '${cohortMonth}%'
LIMIT ${numberOfResults || 5};
`)
.then(res => {
  console.log(res.rows);
})
.catch(err => console.error('query error', err.stack));

