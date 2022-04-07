const { Pool } = require('pg');

const args = process.argv.slice(2);
const cohortName = args[0];
// const numberOfResults = args[1];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT teachers.name as teacher, cohorts.name as cohort, count(*) as total_assistances
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${cohortName}'
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;
`)
.then(res => {
  console.log(res.rows);
})
.catch(err => console.error('query error', err.stack));