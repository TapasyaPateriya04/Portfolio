import {
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglegemini,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiJsonwebtokens,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOllama,
  SiPostman,
  SiPytest,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSpringboot,
  SiSqlite,
  SiStreamlit,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import {
  BugIcon,
  CheckSquareOffsetIcon,
  DatabaseIcon,
  GitPullRequestIcon,
  GraphIcon,
  InfinityIcon,
  PlugsConnectedIcon,
  ShieldCheckIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react";

const brand = {
  java: FaJava,
  python: SiPython,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  springboot: SiSpringboot,
  react: SiReact,
  node: SiNodedotjs,
  express: SiExpress,
  tailwind: SiTailwindcss,
  streamlit: SiStreamlit,
  mongodb: SiMongodb,
  mysql: SiMysql,
  sqlite: SiSqlite,
  sklearn: SiScikitlearn,
  ollama: SiOllama,
  gemini: SiGooglegemini,
  git: SiGit,
  github: SiGithub,
  actions: SiGithubactions,
  postman: SiPostman,
  vscode: VscVscode,
  intellij: SiIntellijidea,
  vercel: SiVercel,
  linux: SiLinux,
  docker: SiDocker,
  jwt: SiJsonwebtokens,
  pytest: SiPytest,
};

const generic = {
  sql: DatabaseIcon,
  api: PlugsConnectedIcon,
  microservices: TreeStructureIcon,
  embeddings: GraphIcon,
  rbac: ShieldCheckIcon,
  validation: CheckSquareOffsetIcon,
  cicd: InfinityIcon,
  review: GitPullRequestIcon,
  debug: BugIcon,
};

export default function SkillIcon({ name, size = 22, className }) {
  const Brand = brand[name];
  if (Brand) return <Brand size={size} className={className} aria-hidden="true" />;
  const Generic = generic[name] || DatabaseIcon;
  return <Generic size={size + 2} weight="duotone" className={className} aria-hidden="true" />;
}
