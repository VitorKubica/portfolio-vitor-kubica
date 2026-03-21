import AvatarShapes from "../svg/AvatarShapes";

export default function Visage() {
  return (
    <figure className="visage relative m-0 z-[1] w-56 h-60 lg:w-72 lg:h-80 border-2 border-bg/30 rounded-[3px] shrink-0">
      <AvatarShapes className="absolute -top-1/4 w-[160%] h-[126%] -right-16 -z-[1]" />
      <span
        className="block w-full h-full -mt-6 -ml-5 bg-bg bg-cover bg-center overflow-hidden rounded-[3px]"
        role="img"
        aria-label="Photo of Vitor Kubica."
        style={{ backgroundImage: "url(/avatar.png)" }}
      >
        <svg viewBox="0 0 300 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="320" fill="#e2e0d6" />
          <circle cx="150" cy="120" r="55" fill="#c8c5b8" />
          <ellipse cx="150" cy="280" rx="80" ry="60" fill="#c8c5b8" />
          <text x="150" y="135" textAnchor="middle" fontSize="48" fontWeight="400" fontStyle="italic" fill="#044d35" fontFamily="Georgia, serif">VK</text>
        </svg>
      </span>
    </figure>
  );
}
