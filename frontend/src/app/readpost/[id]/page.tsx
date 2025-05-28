"use client";
import React from "react";
import { SinglePostPage } from "@/components/SinglePostPage/SinglePostPage";
import { useState, useEffect } from "react";
import { API_URL } from "@/config";
import { useParams } from "next/navigation";
export default function UserPost() {

  const params = useParams();
  const id = params?.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/post/getPostById/${id}`, {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await res.json();
        console.log(data.post)
        setPost(data.post);
      } catch (err) {
        console.error('Error fetching post by ID:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;
  return (
    <SinglePostPage post={post} />
  );
}
