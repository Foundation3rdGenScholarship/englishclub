import React from "react";

export const AmeesageYourAreLate = () => {
  return (
    <div>
      <div class=" flex items-center justify-center p-4">
        <div class="border-2 border-gray-700 rounded-xl shadow-lg w-full ">
          <div class="bg-gray-50 px-4 py-3 border-b">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
              <div class="ml-3">
                <p class="font-medium">Friend</p>
                <p class="text-xs text-gray-500">Online</p>
              </div>
            </div>
          </div>

          <div class="p-4  flex flex-col space-y-3">
            <div class="flex flex-col max-w-xs">
              <div class="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                I'm running 10 mins late, sorry!
              </div>
              <span class="text-xs text-gray-400 mt-1 ml-2">15:57</span>
            </div>

            <div class="flex flex-col items-end self-end max-w-xs">
              <div class="bg-green-100 rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                No problem!
              </div>
              <span class="text-xs text-gray-400 mt-1 mr-2">15:58</span>
            </div>

            <div class="flex flex-col max-w-xs">
              <div class="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                Aargh! Traffic is really bad. I'll be more than 10 mins late
                now, sorry again!!
              </div>
              <span class="text-xs text-gray-400 mt-1 ml-2">16:07</span>
            </div>
            <div class="flex flex-col items-end self-end max-w-xs">
              <div class="bg-green-100 rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                It's OK, don't worry. I'm in the café already so it's fine
              </div>
              <span class="text-xs text-gray-400 mt-1 mr-2">16:08</span>
            </div>
            <div class="flex flex-col max-w-xs">
              <div class="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                This is not my day! I'm here but can't find a place to park. I'm
                looking for a different car park. Not sure how long I'll be
              </div>
              <span class="text-xs text-gray-400 mt-1 ml-2">16:09</span>
            </div>

            <div class="flex flex-col items-end self-end max-w-xs">
              <div class="bg-green-100 rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                OK, LMK when you find a place
              </div>
              <span class="text-xs text-gray-400 mt-1 mr-2">16:11</span>
            </div>

            <div class="flex flex-col items-end self-end max-w-xs">
              <div class="bg-green-100 rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                I might get something to eat tho
              </div>
              <span class="text-xs text-gray-400 mt-1 mr-2">16:11</span>
            </div>

            <div class="flex flex-col max-w-xs">
              <div class="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                Of course! I'll be as quick as I can
              </div>
              <span class="text-xs text-gray-400 mt-1 ml-2">16:13</span>
            </div>

            <div class="flex flex-col items-end self-end max-w-xs">
              <div class="bg-green-100 rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                OK!
              </div>
              <span class="text-xs text-gray-400 mt-1 mr-2">16:13</span>
            </div>
            <div class="flex flex-col max-w-xs">
              <div class="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                Found one! Be there in 10 mins
              </div>
              <span class="text-xs text-gray-400 mt-1 ml-2">16:16</span>
            </div>

            <div class="flex flex-col items-end self-end max-w-xs">
              <div class="bg-green-100 rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                Well done! See you soon
              </div>
              <span class="text-xs text-gray-400 mt-1 mr-2">16:16</span>
            </div>

            <div class="flex flex-col max-w-xs">
              <div class="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                Thx for waiting
              </div>
              <span class="text-xs text-gray-400 mt-1 ml-2">16:17</span>
            </div>
          </div>

          <div class="border-t p-3">
            <div class="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                class="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button class="ml-2 bg-blue-500 text-white rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
