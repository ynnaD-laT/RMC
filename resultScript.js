
/* used for rate and comment buttons*/
  // RATE
  // Function to open the modal
  function openModal() {
    document.getElementById("myModal").style.display = "block";
  }

// Function to close the modal
function closeModal() {
document.getElementById("myModal").style.display = "none";
}

// Function to handle star rating
function rateStar(stars) {
var starElements = document.getElementsByClassName("fa-star");

// Update the color of stars based on user's selection
for (var i = 0; i < starElements.length; i++) {
  if (i < stars) {
    starElements[i].classList.add("checked");
  } else {
    starElements[i].classList.remove("checked");
  }
}
}

// COMMENT
// Function to toggle the visibility of the comment form
function toggleForm() {
var container = document.getElementById("commentContainer");
container.style.display =
  container.style.display === "none" ? "block" : "none";
}
// Function to handle form submission
document.getElementById("commentForm").addEventListener("submit", function (event) {
event.preventDefault(); // Prevent default form submission

var comment = document.getElementById("comment").value;
var currentDate = new Date().toLocaleDateString(); // Get the current date

// Create a new comment element
var newComment = document.createElement("div");
newComment.innerHTML =
"<strong>" + currentDate + "</strong><br>" + comment + "<hr>";

// Append the new comment to the comments container
document.getElementById("commentsContainer").appendChild(newComment);

// Clear the form fields
document.getElementById("comment").value = "";
});




/* STARS CALC */ 
/* generates dynamically */
/* assign array that is called data, dynamic */

let data = [
{
  star: 5,
  count: 99980,
},
{
  star: 4,
  count: 39300,
},
{
  star: 3,
  count: 25050,
},
{
  star: 2,
  count: 10070,
},
{
  star: 1,
  count: 5020,
},
];

let total_rating = 0;
rating_based_on_stars = 0;
/* */
data.forEach((rating) => {
total_rating += rating.count;
/* gives you exact number of stars rating*/
rating_based_on_stars += rating.count * rating.star;
});

/* declare data with rating that represents each indiv element*/
/* `` lets you manipulate string and variables*/
data.forEach((rating) => {
let rating_progress = `
<div class="rating_progress-value">
  <! $ makes it dynamic which lets you pass variables>
    <p>${rating.star}<span class="star">&#9733;</span></p>
    <div class="progress">
      <div class="bar" style= "width: ${
        (rating.count / total_rating) * 100
      }%"></div>
    </div>
    <! converst num to string and after three digits places comma>
    <p>${rating.count.toLocaleString()}</p>
</div>
`;
/* selects div class name, and inserts dynamic code to variable*/
/* += appends diff elements to class name*/
document.querySelector(".rating_progress").innerHTML += rating_progress;
});
/* generate avergage rating from diff star rating values */
let rating_average = (rating_based_on_stars / total_rating).toFixed(1);
/* total rating dynamic*/
document.querySelector(".rating_average h1").innerHTML = rating_average;
document.querySelector(".rating_average p").innerHTML =
total_rating.toLocaleString();
document.querySelector(".star-inner").style.width =
(rating_average / 5) * 100 + "%";

