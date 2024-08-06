"use client"
import { BsMedium } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import sadZeppelins from './sad-zeppelins.svg';
import mainImg from './main-img.png';
import computerImg from './computer-img.png';

async function getPosts() {
  const res = await fetch('https://dummyjson.com/posts');
  const data = await res.json();
  return data.posts;
}

function Card({ date, title, description, imgSrc, id }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMoreClick = () => {
    if (isExpanded) {
      window.location.href = `pages/[prudctid]/${id}`;
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div className="max-w-[90%] w-[800px] p-2 mx-[55px] my-3 bg-white px-[100px]">
      <div className="p-2">
        <Image src={imgSrc} alt={title} width={750} height={150} />
        <p className="text-md text-gray-500">{date}</p>
        <h2 className="mt-2 text-xl font-bold text-red-500">{title}</h2>
        <p className={`mt-2 w-[100%] text-gray-700 ${!isExpanded ? 'truncate' : ''}`} style={{ overflow: isExpanded ? 'visible' : 'hidden' }}>
          {description}
        </p>
        <button onClick={handleReadMoreClick} className="mt-4 inline-block text-red-500 underline">
          READ MORE
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const postsData = await getPosts();
      setPosts(postsData);
    }
    fetchData();
  }, []);

  const showMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 2);
    loadMoreRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main className="">
        <div className="navbar">
          <div className="flex items-center justify-between px-[155px] py-4">
            <a href="#" className="navlink font-light text-sm text-gray-700 hover:text-gray-900">
              <Image src={sadZeppelins} alt="Picture of the author" />
            </a>

            <div className="flex items-center">
              <a href="#" className="ml-4 text-sm font-bold text-gray-700 hover:text-gray-900">EN</a>
              <a href="#" className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-900">CV</a>
              <a href="#" className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-900">PORTFOLIO</a>
              <a href="#" className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-900">STORE</a>
              <a href="#" className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-900">BLOG</a>
              <a href="#" className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-900">ABOUT ME</a>
              <a href="#" className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-900">FREELANCE</a>
              <a href="#" className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-900">CONTACT</a>
            </div>
          </div>
        </div>

        <section className="flex justify-center items-center h-screen">
          <div className="max-w-7xl px-[35px] py-5 flex">
            <div className="flex-col">
              <h1 className="title-main text-4xl font-bold">Blog Posts<br /></h1>
              <h1 className="text-4xl font-normal">I think so, this is it.</h1>
              <p className="mt-4 text-lg text-gray-700 w-[68%]">
                Design begins after I begin to think about how to present an experience most successfully, whether a button I put in can solve a problem. The only point in design is not UI design, if the user does not have a good experience at the end of the product, the design will be considered unsuccessful in my opinion.
              </p>
              <div className="mt-8 flex space-x-4">
                <div>
                  <a href="https://x.com/i/flow/login" target='_blank' className="inline-flex items-center px-4 py-2 text-sm font-medium bg-cyan-500 text-white"><AiOutlineTwitter />Twitter</a>
                </div>
                <div>
                  <a href="https://www.linkedin.com/login" target='_blank' className="inline-flex items-center px-4 py-2 text-sm font-medium bg-cyan-800 text-white"><AiFillLinkedin />Linkedin</a>
                </div>
                <div>
                  <a href="https://medium.com/m/signin" target='_blank' className="inline-flex items-center px-4 py-2 text-sm font-medium bg-slate-950 text-white"><BsMedium />Medium</a>
                </div>
              </div>
            </div>
            <div className="">
              <Image src={mainImg} alt="Main image" width={967} height={407} />
            </div>
          </div>
        </section>

        <section className="flex justify-center items-center h-screen my-[440px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {posts.slice(0, visiblePosts).map((post) => (
              <Card
                key={post.id}
                date={new Date(post.date).toDateString()}
                title={post.title}
                description={post.body}
                imgSrc={computerImg}
                id={post.id}
              />
            ))}
          </div>
        </section>
      </main>
      {visiblePosts < posts.length && (
        <div className="flex justify-center mt-8" ref={loadMoreRef}>
          <button
            onClick={showMorePosts}
            className="px-6 py-2 bg-red-500 text-white font-medium rounded mx-[500px]"
          >

            Show More
          </button>
        </div>
      )}
    </>
  );
}
