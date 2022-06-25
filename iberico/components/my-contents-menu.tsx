import { FaGithub, FaTwitterSquare } from "react-icons/fa"
import { SiZenn } from "react-icons/si"

const MyContentsMenu = () => {
  return (
    <div className="flex flex-row md:flex-col md:items-end justify-center gap-5">
      <a href="https://github.com/t-kawamura1" className="text-2xl hover:text-3xl md:text-3xl md:hover:text-4xl transition-all">
        <FaGithub/>
      </a>
      <a href="https://twitter.com/kossari" className="text-2xl hover:text-3xl md:text-3xl md:hover:text-4xl transition-all">
        <FaTwitterSquare/>
      </a>
      <a href="https://itiiki.hatenablog.com/" className="w-6 hover:w-7 md:w-8 md:hover:w-9 transition-all">
        <img src="/assets/my-contents/hatena.svg.png" alt="はてなブログロゴ"/>
      </a>
      <a href="https://www.wantedly.com/id/t_kawa" className="w-8 hover:w-8 md:w-8 md:hover:w-10 transition-all">
        <img src="/assets/my-contents/wantedly.svg" alt="wantedlyロゴ"/>
      </a>
      <a href="https://zenn.dev/tkawa01" className="text-2xl hover:text-3xl md:text-2xl md:pr-1 md:hover:text-3xl transition-all">
        <SiZenn/>
      </a>
      <a href="https://qiita.com/t-kawamura1" className="w-7 hover:w-8 md:w-8 md:hover:w-9 transition-all">
        <img src="/assets/my-contents/qiita.png" alt="Qiitaロゴ"/>
      </a>
      <a href="https://www.t-kawamura.com" className="w-7 hover:w-8 md:w-8 md:hover:w-9 transition-all">
        <img src="/assets/my-contents/pfsite-favicon.ico" alt="私のロゴ"/>
      </a>
    </div>
  )
}

export default MyContentsMenu