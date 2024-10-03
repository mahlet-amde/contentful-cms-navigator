import React from "react";
import { GetStaticProps } from "next";

interface BlogPost {
  slug: string;
  pageName: string;
}

interface BlogProps {
  posts: BlogPost[];
}

const fetchContentfulData = async (): Promise<BlogPost[]> => {
  const spaceId = "sioedqz4jhj9";
  const environmentId = "master";
  const accessToken = "Zp9D3ZBgF0W5VbwfCqJlf5w-cxa_n6sEhfJTVEGc8wc";

  const query = `
  {
    pageCollection {
      items {
      pageName
      slug
    }
    }
  }
  `;

  // const response = await fetch(
  //   'https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environmentId}',
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     body: JSON.stringify({ query }),
  //   }
  // );

  // const url = `https://graphql.contentful.com/content/v1/spaces/sioedqz4jhj9/explore?access_token=Zp9D3ZBgF0W5VbwfCqJlf5w-cxa_n6sEhfJTVEGc8wc`;
  const url = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environmentId}?access_token=${accessToken}&query=${query}`;

  const response = await fetch(url);

  const data = await response.json();
  return data?.data?.pageCollection.items || [];
};

const BlogPage = async () => {
  const posts = await fetchContentfulData();
  return (
    <div>
      <h1>Blog posts</h1>
      {posts.map((post) => (
        <div key={post.slug}></div>
      ))}
    </div>
  );
};

export default BlogPage;
