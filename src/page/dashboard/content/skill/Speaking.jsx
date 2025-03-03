import React from "react";
import { useAllReadingQuery } from "../../../../redux/features/skill/skillSlice";
const Speaking = () => {
  const { data, isLoading, error } = useAllReadingQuery();

  console.log({ data, isLoading, error }); // Debugging log

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    // <div className="p-4 sm:ml-64  mt-[88px]">
    //   <h1 className="dark:text-white text-black">
    //     This is a content for Speaking
    //   </h1>
    //   <div className="flex justify-center">
    //     <div class="border-2 w-[80%] bg-white p-6 rounded-lg shadow-lg dark:bg-[#111828] dark:text-gray-300 dark:border-gray dark:border-gray-500 text-black">
    //       <p class="font-bold">Ana:</p>
    //       <p>
    //         Hi, I'm Ana. Welcome to <em>What to Say!</em>
    //       </p>
    //       <p class="mt-4">
    //         Do you know what to say when you want to check your understanding?
    //         Listen out for useful language for checking your understanding.
    //         Then, we'll practise saying the new phrases – after this.
    //       </p>

    //       <div class="mt-6 space-y-4">
    //         <p>
    //           <span class="font-bold">Bob:</span> This isn't right. Hey! Excuse
    //           me, Paul, could you pass me the hammer?
    //         </p>
    //         <p>
    //           <span class="font-bold">Paul:</span> Sorry, Bob, my ears are
    //           blocked. I can't hear you very well. Could you say that again,
    //           please?
    //         </p>
    //         <p>
    //           <span class="font-bold">Bob:</span> The hammer. Please could you
    //           pass it to me?
    //         </p>
    //         <p>
    //           <span class="font-bold">Paul:</span> The spanner?
    //         </p>
    //         <p>
    //           <span class="font-bold">Bob:</span> No. The hammer!
    //         </p>
    //         <p>
    //           <span class="font-bold">Paul:</span> Sorry, Bob, I don't
    //           understand. This is the spanner!
    //         </p>
    //         <p>
    //           <span class="font-bold">Bob:</span> No, Paul, I need the hammer.
    //           It's in the toolbox, on the left, under the scissors.
    //         </p>
    //         <p>
    //           <span class="font-bold">Paul:</span> Sorry, Bob. Could you repeat
    //           that more slowly, please?
    //         </p>
    //         <p>
    //           <span class="font-bold">Bob:</span> The hammer … in the toolbox …
    //           on the left … under the scissors.
    //         </p>
    //         <p>
    //           <span class="font-bold">Paul:</span> On the left … under the
    //           scissors … Oh! Do you mean the hammer? Is this it?
    //         </p>
    //         <p>
    //           <span class="font-bold">Bob:</span> Yes, that's right!
    //         </p>
    //         <p>
    //           <span class="font-bold">Paul:</span> Ah! Why didn't you say so?
    //         </p>
    //         <p>
    //           <span class="font-bold">Bob:</span> I did!
    //         </p>
    //       </div>

    //       <p class="font-bold mt-6">Ana:</p>
    //       <p>
    //         Hello again! Oh dear. I think Paul needs to go home and sleep. So,
    //         did you notice the useful phrases used for checking your
    //         understanding? Listen to me and then repeat.
    //       </p>

    //       <ul class="mt-4 space-y-2 font-bold">
    //         <li>I'm sorry?</li>
    //         <li>I can't hear you very well.</li>
    //         <li>Could you say that again, please?</li>
    //         <li>I don't understand.</li>
    //         <li>Can you repeat that more slowly, please?</li>
    //         <li>Do you mean the hammer?</li>
    //         <li>Is this it?</li>
    //         <li>Yes, that's right!</li>
    //       </ul>

    //       <p class="mt-6">
    //         <span class="font-bold">Ana:</span> Try and use some of these
    //         phrases the next time you want to check your understanding in
    //         English. Bye for now!
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="p-4 sm:ml-64 mt-[88px]">
      <body class="p-6">
        <div class="rounded-xl shadow-md overflow-hidden dark:text-gray-400 border-2 border-gray-600">
          <div class="p-8">
            <h1 class="text-4xl font-bold dark:text-gray-400 text-indigo-900  mb-6">
              My profile
            </h1>

            <div class="mb-8">
              <h2 class="text-3xl font-bold dark:text-gray-400 text-indigo-900 mb-4">
                About me
              </h2>
              <p class="text-gray-800 dark:text-gray-400 mb-4">
                By day I'm a regular guy and by night a superhero ... How tiring
                is that?!
              </p>
              <p class="text-gray-800 dark:text-gray-400">
                Just joking! I'm a regular guy all the time, good job, close to
                my family, just bought my own flat with a cat. Actually, my cat
                thinks I'm a hero because I saved her from the street. I'm a
                talkative person and I believe communication is the most
                important thing in a relationship.
              </p>
            </div>

            <div class="mb-8">
              <h2 class="text-3xl font-bold dark:text-gray-400 text-indigo-900 mb-4">
                Likes and dislikes
              </h2>
              <p class="text-gray-800 dark:text-gray-400">
                I love pizza if it's Italian, wine if it's white, and football
                if it's the World Cup. I read a lot, especially true life
                stories, but most of my books live on my phone.
              </p>
            </div>

            <div class="mb-6">
              <h2 class="text-3xl font-bold dark:text-gray-400 text-indigo-900 mb-4">
                Hobbies
              </h2>
              <p class="text-gray-800 dark:text-gray-400">
                I love to travel and I'm always planning my next trip. I prefer
                an active holiday like hiking, skiing or watersports and I get
                bored lying on the beach. I post lots of photos on Instagram as
                I'm a good photographer but I'd really love to share the holiday
                with someone. Maybe you'll take the photos on the next trip.{" "}
                <span class="text-xl">😊</span>
              </p>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Speaking;
