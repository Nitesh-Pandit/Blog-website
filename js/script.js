// Get UI elements

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");


const posts = document.querySelectorAll(".blog-post");



// Add event listeners for search and filter inputs

searchInput.addEventListener("keyup", filterPosts);

categoryFilter.addEventListener("change", filterPosts);



// Function to filter blog posts based on search query and category

function filterPosts() {

  const query = searchInput.value.toLowerCase();

  const category = categoryFilter.value.toLowerCase();



  posts.forEach((post) => {

    const text = post.textContent.toLowerCase();

    const tags = post.dataset.tags.toLowerCase();



    const matchesSearch = text.includes(query);

    const matchesCategory = category === "all" || tags.includes(category);






    post.style.display = matchesSearch && matchesCategory ? "block" : "none";
  })
    ;
}


// Comment system: add comments dynamically with validation

document.querySelectorAll(".comment-form").forEach((form) => {

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const nameInput = form.querySelector("input");

    const messageInput = form.querySelector("textarea");




    const name = nameInput.value.trim();

    const message = messageInput.value.trim();



    if (name && message) {



      const commentList = form.previousElementSibling;

      const comment = document.createElement("div");


      comment.classList.add("comment");

      comment.innerHTML = `<strong>${sanitize(name)}:</strong> ${sanitize(

        message


      )}`;



      commentList.appendChild(comment);


      form.reset();
    } else {

      alert("Please fill in both name and comment.");
    }

  }) ;
});

// Social media share function opening the
//  appropriate platform share URL
function sharePost(platform, title) {



  const url = encodeURIComponent(window.location.href);

  const text = encodeURIComponent(`Check out this post: ${title}`);

  let shareUrl = "";





  switch (platform) {

    case "facebook":

      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

      break;

    case "twitter":

      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

      break;
    case "whatsapp":

      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;

      break;

    case "linkedin":

      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

      break;


    default:

      console.warn("Unsupported social media platform:", platform);


      return;

  }
  window.open(shareUrl, "_blank");
}




// Basic sanitization to prevent injection in comments

function sanitize(str) {


  const temp = document.createElement("div");

  temp.textContent = str;
  return temp.innerHTML;


}

