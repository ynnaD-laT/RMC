 // Function to toggle the visibility of the comment form
 function toggleForm() {
    var container = document.getElementById("commentContainer");
    container.style.display =
      container.style.display === "none" ? "block" : "none";
  }

  // Function to handle form submission
  document
    .getElementById("commentForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      var username = document.getElementById("username").value;
      var comment = document.getElementById("comment").value;
      var currentDate = new Date().toLocaleDateString(); // Get current date

      // Create a new comment element
      var newComment = document.createElement("div");
      newComment.innerHTML =
        "<strong>" +
        username +
        "</strong> - " +
        currentDate +
        "<br>" +
        comment +
        "<hr>";

      // Append the new comment to the comments container
      document.getElementById("commentsContainer").appendChild(newComment);

      // Clear the form fields
      document.getElementById("username").value = "";
      document.getElementById("comment").value = "";
    });