import React from "react";
import { useAllReadingQuery } from "../../../../redux/features/skill/readingSlice";

const Speaking = () => {
  const { data, isLoading, error } = useAllReadingQuery();

  console.log({ data, isLoading, error }); // Debugging log

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;

  return (
    <div className="p-4 sm:ml-64  mt-[88px]">
      <h1 className="dark:text-white text-black">
        This is a content for Speaking
      </h1>
      <div className="flex justify-center">
        <div class="border-2 w-[80%] bg-white p-6 rounded-lg shadow-lg dark:bg-[#111828] dark:text-gray-300 dark:border-gray dark:border-gray-500 text-black">
          <p class="font-bold">Ana:</p>
          <p>
            Hi, I'm Ana. Welcome to <em>What to Say!</em>
          </p>
          <p class="mt-4">
            Do you know what to say when you want to check your understanding?
            Listen out for useful language for checking your understanding.
            Then, we'll practise saying the new phrases – after this.
          </p>

          <div class="mt-6 space-y-4">
            <p>
              <span class="font-bold">Bob:</span> This isn't right. Hey! Excuse
              me, Paul, could you pass me the hammer?
            </p>
            <p>
              <span class="font-bold">Paul:</span> Sorry, Bob, my ears are
              blocked. I can't hear you very well. Could you say that again,
              please?
            </p>
            <p>
              <span class="font-bold">Bob:</span> The hammer. Please could you
              pass it to me?
            </p>
            <p>
              <span class="font-bold">Paul:</span> The spanner?
            </p>
            <p>
              <span class="font-bold">Bob:</span> No. The hammer!
            </p>
            <p>
              <span class="font-bold">Paul:</span> Sorry, Bob, I don't
              understand. This is the spanner!
            </p>
            <p>
              <span class="font-bold">Bob:</span> No, Paul, I need the hammer.
              It's in the toolbox, on the left, under the scissors.
            </p>
            <p>
              <span class="font-bold">Paul:</span> Sorry, Bob. Could you repeat
              that more slowly, please?
            </p>
            <p>
              <span class="font-bold">Bob:</span> The hammer … in the toolbox …
              on the left … under the scissors.
            </p>
            <p>
              <span class="font-bold">Paul:</span> On the left … under the
              scissors … Oh! Do you mean the hammer? Is this it?
            </p>
            <p>
              <span class="font-bold">Bob:</span> Yes, that's right!
            </p>
            <p>
              <span class="font-bold">Paul:</span> Ah! Why didn't you say so?
            </p>
            <p>
              <span class="font-bold">Bob:</span> I did!
            </p>
          </div>

          <p class="font-bold mt-6">Ana:</p>
          <p>
            Hello again! Oh dear. I think Paul needs to go home and sleep. So,
            did you notice the useful phrases used for checking your
            understanding? Listen to me and then repeat.
          </p>

          <ul class="mt-4 space-y-2 font-bold">
            <li>I'm sorry?</li>
            <li>I can't hear you very well.</li>
            <li>Could you say that again, please?</li>
            <li>I don't understand.</li>
            <li>Can you repeat that more slowly, please?</li>
            <li>Do you mean the hammer?</li>
            <li>Is this it?</li>
            <li>Yes, that's right!</li>
          </ul>

          <p class="mt-6">
            <span class="font-bold">Ana:</span> Try and use some of these
            phrases the next time you want to check your understanding in
            English. Bye for now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Speaking;
