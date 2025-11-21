import React from "react";

const Story = () => {
  return (
    <div>
      <div className="">
        {/* Story Component Content */}
        <div className="">
          {/* Individual Story Items */}
          <div className="inline-block mr-4 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1762954419322-f4fe43ece823?q=80&w=992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="story1"
              className="rounded-full w-20 h-20 border-2 border-blue-500 p-1"
            />
            <p className="text-center text-sm mt-1">User 1</p>
          </div>
          <div className="inline-block mr-4 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1762325658409-5d8aa0e43261?q=80&w=2758&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="story2"
              className="rounded-full w-20 h-20 border-2 border-blue-500 p-1"
            />
            <p className="text-center text-sm mt-1">User 2</p>
          </div>
          <div className="inline-block mr-4 cursor-pointer">
            <img
              src="https://images.squarespace-cdn.com/content/v1/5d7fa27ac591f01062106a9f/d355ee04-655f-4f37-99bb-744d97a6bd1a/Virat+Kohli.jpg"
              alt="story3"
              className="rounded-full w-20 h-20 border-2 border-blue-500 p-1"
            />
            <p className="text-center text-sm mt-1">User 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
