// Friendly display names for repos
export const repoNames = {
  "ghostfolio-agent": "AgentForge", "collab_space": "CollabBoard", "NASTRAN-search": "LegacyLens",
  "TTB_reader": "Alcohol label verifier", "zania-qa": "Document Q&A API",
  "footprints-in-the-snow": "Footprints in the Snow", "CongressionalTrading": "Congressional trading datastore",
  "rev-agent": "Rev agent", "ship": "Ship", "phostro": "Phostro", "ChatBridge": "ChatBridge",
};
// From the resume
export const impact = [
  { org: "Gauntlet AI", role: "AI Engineer Fellow", when: "2026", stats: [
    ["93%", "lower API latency on Ship"], ["92%", "fewer runtime errors"], ["0", "accessibility violations left"] ] },
  { org: "Intelizen", role: "Software Engineer", when: "2025 – 2026", stats: [
    ["$50B", "healthcare portfolio analyzed"], ["15%", "of outstanding revenue recovered"], ["30%", "lower cloud costs"], ["30+", "concurrent uploads processed"] ] },
  { org: "Step AI", role: "Founder and CTO", when: "2023 – 2024", stats: [
    ["3,000+", "users"], ["15%", "monthly growth"], ["30%", "activation rate"], ["40%", "smaller context payload"] ] },
  { org: "Headstarter AI", role: "Builder", when: "2024 – 2025", stats: [
    ["20%", "monthly user growth (BadgerAI)"] ] },
  { org: "Amazon", role: "SDE Intern", when: "2021 – 2022", stats: [
    ["25%", "fewer onboarding tickets"], ["350+", "users covered"], ["5x", "throughput"] ] },
  { org: "Roku", role: "Software Engineer Intern", when: "2021", stats: [
    ["50M+", "ad data segments"], ["300+", "data sources"], ["70%", "peak match rate"] ] },
];
// From each project's README
export const quality = [
  { num: "228", label: "tests, behind a 90% coverage gate", project: "Document Q&A API", href: "https://github.com/ivanma9/zania-qa" },
  { num: "57%", label: "first-try eval pass rate, up from 17%", project: "Footprints in the Snow", href: "https://github.com/ivanma9/footprints-in-the-snow" },
  { num: "30", label: "scenarios in the live LLM eval", project: "Footprints in the Snow", href: "https://github.com/ivanma9/footprints-in-the-snow" },
  { num: "28", label: "labels in the golden eval set", project: "Alcohol label verifier", href: "https://github.com/ivanma9/TTB_reader" },
  { num: "30k+", label: "stars on the repo where my Twilio block merged", project: "Sim Studio", href: "https://github.com/simstudioai/sim/pull/201" },
];
