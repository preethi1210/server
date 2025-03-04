import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si"; // Importing an 'S' shaped icon
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-2">
        
        {/* Company Section */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <SiGoogleclassroom className="text-white text-3xl" />
            <p className="text-sm font-semibold text-white">StudyNotion</p>
          </div>

          <h4 className="text-white font-semibold">Company</h4>
          <ul className="mt-2 space-y-2 text-xs">
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/careers" className="hover:text-white">Careers</a></li>
            <li><a href="/affiliates" className="hover:text-white">Affiliates</a></li>
          </ul>
          <div className="flex space-x-3 mt-4">
            <a href="https://facebook.com" className="hover:text-white"><FaFacebook aria-label="Facebook" /></a>
            <a href="https://google.com" className="hover:text-white"><FaGoogle aria-label="Google" /></a>
            <a href="https://github.com" className="hover:text-white"><FaGithub aria-label="Github" /></a>
            <a href="https://twitter.com" className="hover:text-white"><FaTwitter aria-label="Twitter" /></a>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold">Resources</h4>
          <ul className="mt-2 space-y-2 text-xs">
            {[
              { name: "Articles", link: "/articles" },
              { name: "Blog", link: "/blog" },
              { name: "Chart Sheet", link: "/charts" },
              { name: "Code Challenges", link: "/challenges" },
              { name: "Docs", link: "/docs" },
              { name: "Projects", link: "/projects" },
              { name: "Videos", link: "/videos" },
              { name: "Workspaces", link: "/workspaces" }
            ].map((item) => (
              <li key={item.name}><a href={item.link} className="hover:text-white">{item.name}</a></li>
            ))}
          </ul>
          <h4 className="text-white font-semibold mt-4">Support</h4>
          <ul className="mt-2 space-y-2 text-xs">
            <li><a href="/help" className="hover:text-white">Help Center</a></li>
          </ul>
        </div>

        {/* Plans */}
        <div>
          <h4 className="text-white font-semibold">Plans</h4>
          <ul className="mt-2 space-y-2 text-xs">
            {[
              { name: "Paid Memberships", link: "/memberships" },
              { name: "For Students", link: "/students" },
              { name: "Business Solutions", link: "/business" }
            ].map((item) => (
              <li key={item.name}><a href={item.link} className="hover:text-white">{item.name}</a></li>
            ))}
          </ul>
          <h4 className="text-white font-semibold mt-4">Community</h4>
          <ul className="mt-2 space-y-2 text-xs">
            {[
              { name: "Forums", link: "/forums" },
              { name: "Chapters", link: "/chapters" },
              { name: "Events", link: "/events" }
            ].map((item) => (
              <li key={item.name}><a href={item.link} className="hover:text-white">{item.name}</a></li>
            ))}
          </ul>
        </div>

        {/* Subjects */}
        <div>
          <h4 className="text-white font-semibold">Subjects</h4>
          <ul className="mt-2 space-y-2 text-xs">
            {["AI", "Cloud Computing", "Code Foundations", "Computer Science", "Cybersecurity", "Data Science", "Data Visualization", "Developer Tools", "DevOps", "Game Development", "IT", "Machine Learning", "Math", "Mobile Development", "Web Design", "Web Development"].map((item) => (
              <li key={item}><a href={`/subjects/${item.toLowerCase().replace(/ /g, "-")}`} className="hover:text-white">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
        <h4 className="text-white font-semibold">Languages</h4>
        <ul className="mt-2 space-y-2 text-xs">
          <li><a href="/bash" className="hover:text-white">Bash</a></li>
          <li><a href="/cpp" className="hover:text-white">C++</a></li>
          <li><a href="/javascript" className="hover:text-white">JavaScript</a></li>
          <li><a href="/csharp" className="hover:text-white">C#</a></li>
          <li><a href="/go" className="hover:text-white">Go</a></li>
          <li><a href="/sql" className="hover:text-white">SQL</a></li>
          <li><a href="/html-css" className="hover:text-white">HTML & CSS</a></li>
          <li><a href="/kotlin" className="hover:text-white">Kotlin</a></li>
          <li><a href="/r" className="hover:text-white">R</a></li>
          <li><a href="/java" className="hover:text-white">Java</a></li>
          <li><a href="/php" className="hover:text-white">PHP</a></li>
          <li><a href="/python" className="hover:text-white">Python</a></li>
          <li><a href="/ruby" className="hover:text-white">Ruby</a></li>
          <li><a href="/swift" className="hover:text-white">Swift</a></li>
        </ul>
      </div>
      
        <div>
          <h4 className="text-white font-semibold">Career Builder</h4>
          <ul className="mt-2 space-y-2 text-xs">
            {["Career Paths", "Career Services", "Interview Prep", "Professional Certification"].map((item) => (
              <li key={item}><a href="#" className="hover:text-white">{item}</a></li>
            ))}
          </ul>
          <h4 className="text-white font-semibold mt-4">More</h4>
          <ul className="mt-2 space-y-2 text-xs">
            {["Full Catalog", "Data Content"].map((item) => (
              <li key={item}><a href="#" className="hover:text-white">{item}</a></li>
            ))}
          </ul>
        </div>
        </div>
<div>
        {/* Bottom Section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
          <div className="flex space-x-6">
            <a href="/privacy" className="text-gray-400 hover:text-white" aria-label="Privacy Policy">Privacy Policy</a>
            <a href="/cookies" className="text-gray-400 hover:text-white" aria-label="Cookie Policy">Cookie Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white" aria-label="Terms">Terms</a>
          </div>
          <p className="text-gray-400 mt-2 md:mt-0">Made with ❤️ by CodeHelp © 2023 StudyNotion</p>
        </div></div>
    </footer>
  );
}
