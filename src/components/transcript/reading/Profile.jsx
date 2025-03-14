export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900">My profile</h1>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">About me</h2>
        <p className="mt-2 text-gray-800">
          By day I'm a regular guy and by night a superhero ... How tiring is
          that?!
        </p>
        <p className="mt-2 text-gray-800">
          Just joking! I'm a regular guy all the time, good job, close to my
          family, just bought my own flat with a cat. Actually, my cat thinks
          I'm a hero because I saved her from the street. I'm a talkative person
          and I believe communication is the most important thing in a
          relationship.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Likes and dislikes
        </h2>
        <p className="mt-2 text-gray-800">
          I love pizza if it's Italian, wine if it's white, and football if it's
          the World Cup. I read a lot, especially true life stories, but most of
          my books live on my phone.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Hobbies</h2>
        <p className="mt-2 text-gray-800">
          I love to travel and I'm always planning my next trip. I prefer an
          active holiday like hiking, skiing or watersports and I get bored
          lying on the beach. I post lots of photos on Instagram as I'm a good
          photographer but I'd really love to share the holiday with someone.
          Maybe you'll take the photos on the next trip.{" "}
          <span className="text-xl">😊</span>
        </p>
      </section>
    </div>
  );
}
