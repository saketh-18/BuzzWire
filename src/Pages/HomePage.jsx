import React from "react";
import Post from "../components/Post";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Article from "../components/Article";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserArticles from "../components/UserArticles";
import Sports from "../components/Sport";

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Navbar */}
      <div className="border-b border-gray-200 mt-4">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Banner */}
        <Banner />

        {/* Featured Posts */}
        <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">
            Featured Stories
          </h2>
          <Post />
        </section>

        {/* Latest Research Articles */}
        <section className="bg-white py-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <Sports />
          </div>
        </section>

        {/* User Articles */}
        <section className="bg-gray-100 py-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <UserArticles />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
