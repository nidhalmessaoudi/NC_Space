const viewsMarkup = {
  style: `
    <style>
        body {
          text-align: center;
        }
        #root {
        display: flex;
        justify-content: center;
        }
        form, input, button {
        display: block;
        margin: 5px;
        }
    </style>
  `,
  "/": `
    <ul>
        <li><a href="/articles" class="articles">Get all articles</a></li>
        <li><a href="/login" class="login">Login</a></li>
        <li><a href="/create" class="create">Create new article</a></li>
    </ul>
  `,
  "/articles": `
    <form class="get_all-form">
        <button type="submit">Get All Articles</button>
    </form>
    `,
  "/article": `
    <form class="get_one-form">
        <button type="submit">Get Article</button>
    </form>
  `,
  "/login": `
    <form class="login-form">
        <label>Email</label>
        <input type="text" class="email">
        <label>password</label>
        <input type="password" class="password">
        <button type="submit">Login</button>
    </form>
  `,
  "/create": `
    <form class="create-form">
        <label>Name</label>
        <input type="text" class="article-name">
        <label>Category</label>
        <input type="text" class="article-category">
        <label>Reading time</label>
        <input type="number" class="article-reading-time">
        <label>Number of paragraphs</label>
        <input type="number" class="article-paragraphs">
        <label>Cover image url</label>
        <input type="text" class="article-cover-image">
        <label>Body</label>
        <textarea class="article-body" id="" cols="30" rows="10"></textarea> 
        <button type="submit">Create Article</button>
    </form>
  `,
  notFound: `
  <h2>This path is not found!</h2>
  `,
};

export default viewsMarkup;
