import AvatarShapes from "../svg/AvatarShapes";

export default function Visage() {
  return (
    <figure className="visage relative m-0 z-[1] w-56 h-60 lg:w-72 lg:h-80 border-2 border-white shrink-0">
      <AvatarShapes className="absolute -top-1/4 w-[160%] h-[126%] -right-16 -z-[1]" />
      <span
        className="block w-full h-full -mt-6 -ml-5 bg-white bg-cover bg-center overflow-hidden"
        role="img"
        aria-label="Photo of Vitor Kubica."
        style={{ backgroundImage: "url(/avatar.png)" }}
      >
        <svg viewBox="0 0 300 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="320" fill="#e8e0f0" />
          <circle cx="150" cy="120" r="55" fill="#c4b5d9" />
          <ellipse cx="150" cy="280" rx="80" ry="60" fill="#c4b5d9" />
          <text x="150" y="135" textAnchor="middle" fontSize="48" fontWeight="900" fill="#4831d4" fontFamily="sans-serif">VK</text>
        </svg>
      </span>
    </figure>
  );
}
