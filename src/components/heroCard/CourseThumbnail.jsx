export default function CourseThumbnail({ img, title, accentText }) {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-102 group">
      {/* Gradient overlay on image */}
      <div className="relative aspect-video w-full">
        <img
          src={img}
          alt="Course thumbnail"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content overlay with better spacing and styling */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <div className="transform transition-transform group-hover:translate-y-[-5px]">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            {title}
            <span className="text-primary-400 ml-2">{accentText}</span>
          </h2>

          {/* Badge/label for category or level */}
          <div className="mt-2 flex gap-2">
            <span className="inline-block rounded-full bg-primary-500 px-3 py-1 text-xs font-medium text-white">
              Popular Course
            </span>
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              Intermediate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// // Example usage
// export default function LearningThumbnail() {
//   return (
//     <div className="flex justify-center p-6 bg-gray-100">
//       <CourseThumbnail
//         img="/images/course-english.jpg"
//         title="Learn Online with"
//         accentText="FluentFlow"
//       />
//     </div>
//   );
// }
