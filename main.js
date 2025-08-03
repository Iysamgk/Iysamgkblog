let posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

// Show posts on index.html
if (document.getElementById('blog-list')) {
  const container = document.getElementById('blog-list');
  function showPosts(filteredPosts = posts) {
    container.innerHTML = '';
    filteredPosts.reverse().forEach((post, index) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post-card';
      postDiv.innerHTML = `
        <h2 onclick="window.location.href='post.html?id=${index}'">${post.title}</h2>
        <p><strong>Category:</strong> ${post.tag || 'General'}</p>
        <p>${post.content.substring(0, 120)}... <a href="post.html?id=${index}">Read more</a></p>
      `;
      container.appendChild(postDiv);
    });
  }

  showPosts();

  document.getElementById('search').addEventListener('input', function () {
    const keyword = this.value.toLowerCase();
    const filtered = posts.filter(p =>
      p.title.toLowerCase().includes(keyword) ||
      p.content.toLowerCase().includes(keyword)
    );
    showPosts(filtered);
  });
}

// Admin posting
if (document.getElementById('postForm')) {
  document.getElementById('postForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const tag = document.getElementById('tag').value;
    const content = document.getElementById('content').value;
    posts.push({ title, tag, content });
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    alert('Post Published!');
    window.location.href = 'index.html';
  });
}

// Show full post on post.html
if (document.getElementById('post-content')) {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const post = posts[postId];
  const container = document.getElementById('post-content');

  if (post) {
    container.innerHTML = `
      <h2>${post.title}</h2>
      <p><strong>Category:</strong> ${post.tag || 'General'}</p>
      <p>${post.content}</p>
    `;
  } else {
    container.innerHTML = '<p>Post not found.</p>';
  }
}