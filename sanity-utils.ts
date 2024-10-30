import { Blog } from "@/types/blog";
import ImageUrlBuilder from "@sanity/image-url";
import { createClient, type QueryParams } from "next-sanity";
import clientConfig from "./config/client-config";
import {
  postByAuthor,
  postQuery,
  postQueryByCategory,
  postQueryBySlug,
  postQueryByTag,
} from "./sanity-query";

export const client = createClient(clientConfig);
export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  tags,
}: {
  query: string;
  qParams: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    cache: "force-cache",
    next: { tags },
  });
}

export function imageBuilder(source: string) {
  return ImageUrlBuilder(clientConfig).image(source);
}

export const getPosts = async () => {
  const data: Blog[] = await sanityFetch({
    query: postQuery,
    qParams: {},
    tags: ["post", "author", "tagDetail"],
  });
  return data;
};

export const getPost = async (slug: string) => {
  const data: Blog = await sanityFetch({
    query: postQueryBySlug,
    qParams: { slug },
    tags: ["post", "author", "tagDetail"],
  });

  return data;
};

export const getPostsByTag = async (slug: string) => {
  const data: Blog[] = await sanityFetch({
    query: postQueryByTag,
    qParams: { slug },
    tags: ["post", "author", "category"],
  });

  return data;
};

export const getPostsByCategory = async (category: string) => {
  const data: Blog[] = await sanityFetch({
    query: postQueryByCategory,
    qParams: { category },
    tags: ["post", "author", "tagDetail"],
  });

  return data;
};

export const getPostsByAuthor = async (slug: string) => {
  const data: Blog[] = await sanityFetch({
    query: postByAuthor,
    qParams: { slug },
    tags: ["post", "author", "tagDetail"],
  });

  return data;
};
