// -------Search Functionality---------
document.getElementById('searchInput');
// --------Category Filter--------
document.getElementById('categoryFilter');
// --------Blog Posts--------
const posts=document.querySelectorAll('.blog-post');
// --------Event Listeners--------
searchInput.addEventListener("keyup",function(){
  filterPosts();
});
// -------Category Filter Event Listener--------
categoryFilter.addEventListener("change",function(){
  filterPosts();
});
// -------Filter Function--------
function filterPosts(){ 
  const query =searchInput.value.toLowerCase();
  const category =categoryFilter.value.toLowerCase();
  // -------Filter Logic--------
  posts.forEach(post=>{
    const text=post.textContent.toLowerCase();
    const tags=post.dataset.tags.toLowerCase();
    const matchesSearch=text.includes(query);
    const matchesCategory=category==="all"||tags.includes(category);
    // -------Show/Hide Posts--------
    post.style.display=matchesSearch&&matchesCategory?"block":"none";
  });
}
// -------Comment System---------

// -------Event Listener for Comment Submission--------
document.querySelectorAll('.comment-form').forEach(form=>{
  form.addEventListener("submit",function(e){
    e.preventDefault();
    const name=form.querySelector("input").value.trim();
    const message=form.querySelector("textarea").value.trim();
    // -------Validation and Add comment--------
    if(name && message){
      const commnetList=form.previousElementSibling;
      const comment=document.createElement("div");
      comment.classList.add("comment");
      comment.innerHTML=`<strong>${name}:</strong>${message}`;
      commnetList.appendChild(comment);
      form.reset();
    }
  });
});

// -------Social Media Share---------
// -------Function for Share Buttons--------
function sharePost(platform,title){
  const url=encodeURIComponent(window.location.href);
  const text=encodeURIComponent(`Check out this post: ${title}`); 
  let shareUrl="";
  // -------Construct Share URL Based on Platform--------
  if(platform==="facebook")
    shareUrl=`https://www.facebook.com/sharer/sharer.php?u=${url}`;
  // -------Twitter--------
  if(platform==="twitter")
    shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  // -------WhatsApp--------
  if(platform==="whatsapp")
    shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
  // -------Linkedin--------
   if (platform === "linkedin")
    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  // Open Share URL in New Tab
  window.open(shareUrl, "_blank");
}

