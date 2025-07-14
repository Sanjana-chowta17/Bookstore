const axios = require('axios');

// BASE URL of your backend
const BASE_URL = 'http://localhost:5000/books';

console.log('\n--- Task 10: Get all books using CALLBACK (via setTimeout) ---');

// ✅ Task 10 - Callback Style
function getAllBooksCallback(callback) {
  setTimeout(() => {
    axios.get(BASE_URL)
      .then(response => callback(null, response.data))
      .catch(err => callback(err));
  }, 1000);
}

getAllBooksCallback((err, data) => {
  if (err) {
    console.error('Error fetching books:', err.message);
  } else {
    console.log(data);
  }

  // Continue to next task after 1s delay
  setTimeout(task11_Promise_ISBN, 1000);
});


// ✅ Task 11 - Promises (Get book by ISBN)
function task11_Promise_ISBN() {
  console.log('\n--- Task 11: Get book by ISBN using Promises ---');

  axios.get(`${BASE_URL}/isbn/1111`)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.error('Error:', err.message);
    })
    .finally(() => {
      setTimeout(task12_AsyncAuthor, 1000);
    });
}


// ✅ Task 12 - Async/Await (Author)
async function task12_AsyncAuthor() {
  console.log('\n--- Task 12: Get books by Author using async/await ---');

  try {
    const response = await axios.get(`${BASE_URL}/author/Author A`);
    console.log(response.data);
  } catch (err) {
    console.error('Error:', err.message);
  }

  setTimeout(task13_AsyncTitle, 1000);
}


// ✅ Task 13 - Async/Await (Title)
async function task13_AsyncTitle() {
  console.log('\n--- Task 13: Get books by Title using async/await ---');

  try {
    const response = await axios.get(`${BASE_URL}/title/Book One`);
    console.log(response.data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}
