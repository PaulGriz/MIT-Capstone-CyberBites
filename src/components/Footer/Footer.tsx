import { AiFillLinkedin, AiFillGithub } from "react-icons/ai"

export default function Footer() {
  return (
    <footer className="mx-2 mt-4 flex flex-row items-center justify-center border-t-2 border-slate-200 bg-white px-2 py-3 font-mono md:px-8">
      <span className="mr-5 text-sm text-gray-500 sm:text-center lg:mr-10">
        © 2023{" "}
        <a
          href="https://github.com/PaulGriz"
          target="_blank"
          className="hover:text-gray-900 hover:underline"
        >
          Paul Griz
        </a>
        . All Rights Reserved.
      </span>
      <div className="flex flex-row items-center">
        <a href="https://github.com/PaulGriz" target="_blank" className="mr-3">
          <AiFillGithub size={24} className="text-gray-500 hover:text-gray-900" />
          <span className="sr-only">GitHub account</span>
        </a>
        <a href="https://www.linkedin.com/in/paul-griz/" target="_blank">
          <AiFillLinkedin size={26} className="text-gray-500 hover:text-gray-900" />

          <span className="sr-only">Twitter page</span>
        </a>
      </div>
    </footer>
  )
}
