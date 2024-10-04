"use client";

import React, { useState, useEffect } from "react";
import * as contentful from 'contentful'

interface BlogPost {
  slug: string;
  pageName: string
}

interface BlogProps {
  posts: BlogPost[];
}

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN 

// if(!space || !accessToken){
//   throw new Error
// }

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  const space = process.env.CONTENTFUL_SPACE_ID || 'sioedqz4jhj9'
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || "U72dx5dJS7PUGgQPlfyA5jHfoUcPvMC9d294kYl54TE"

  if(!space || !accessToken){
    throw new Error("missing contentful cofiguration");
  }

  const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: space,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: accessToken,
  })


  async function fetchEntries(contentType : string, slug : string) {
    if(accessToken){
      const entries = await client.getEntries({
        content_type: 'page',
        "fields.slug": slug,
        include: 5    
      })
      if (entries.items) {
        console.log("entires", entries.items)
        return entries.items
      }
      console.log(`Error getting Entries for ${contentType}.`)
    }
    console.log(`Access Token is undefined`);
  }

  async function fetchPosts() {
    const url = "https://jsonplaceholder.typicode.com/todos/";
    try {
      const response = await fetch(url);

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("response", response);
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  useEffect(() => {
    fetchEntries("ContentType", "slug");
  }, []);

  return (
    <div>
      <h1>Blog posts</h1>
      {posts.map((post) => (
      <div key={post.slug}>{post.pageName}</div>
     ))}
    </div>
  );
};

export default BlogPage;
// 'use client'

// import { useState, useEffect } from 'react'

// function Posts() {
//   const [posts, setPosts] = useState(null)

//   useEffect(() => {
//     async function fetchPosts() {
//       const url = 'https://api.vercel.app/blog';
//       const res = await fetch(url)
//       const data = await res.json()
//       setPosts(data)
//       console.log(data);
//     }
//     fetchPosts()
//   }, [])

//   if (!posts) return <div>Loading...</div>

//   return (
//     <ul>
//       {/* {posts.map((post) => (
//         <li key={post.id}>{post.title}</li>
//       ))} */}
//     </ul>
//   )
// }

// export default Posts;
