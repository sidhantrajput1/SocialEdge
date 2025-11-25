<div className="border p-4 w-[600px]  mt-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={
              user?.avatar ||
              "https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
            }
            alt="profile"
            className="rounded-full w-8 h-8"
          />

          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.username}</p>
          </div>
        </div>
        <div className="mt-2">
          <img src={postimg} alt="" className="w-400, h-100 rounded-sm" />

          <div className="">
            {/* <h2 className="font-bold text-lg mt-2">Beautiful Scenery</h2> */}

            <div className="mt-2 flex items-center gap-3 text-gray-600">
              <span className="cursor-pointer">
                <Heart />
              </span>
              <span>
                <MessageCircle />
              </span>
              <span>
                <Share />
              </span>
            </div>
          </div>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus,
            odit?
          </p>
        </div>
      </div>
      <div className="border p-4 w-[600px]  mt-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={
              user?.avatar ||
              "https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
            }
            alt="profile"
            className="rounded-full w-8 h-8"
          />

          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.username}</p>
          </div>
        </div>
        <div className="mt-2">
          <img src={postimg} alt="" className="w-400, h-100 rounded-sm" />

          <div className="">
            {/* <h2 className="font-bold text-lg mt-2">Beautiful Scenery</h2> */}

            <div className="mt-2 flex items-center gap-3 text-gray-600">
              <span className="cursor-pointer">
                <Heart />
              </span>
              <span>
                <MessageCircle />
              </span>
              <span>
                <Share />
              </span>
            </div>
          </div>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus,
            odit?
          </p>
        </div>
      </div>