// Felles data for StatusBoard, StackDiagram, BlastRadius og AppImpact

export type CoreId = 'git' | 'pkg'
export type Scenario = 'git' | 'pkg' | 'both'
export type Level = 'stop' | 'manual'

export const core: { id: CoreId; name: string; sub: string; icon: string }[] = [
  { id: 'git', name: 'Git', sub: 'GitLab / GitHub', icon: 'i-simple-icons:git' },
  { id: 'pkg', name: 'Pakkebrønn', sub: 'ProGet / JFrog', icon: 'i-carbon:package' },
]

export const tools: { id: string; name: string; sub: string; icon: string; deps: CoreId[] }[] = [
  { id: 'argo', name: 'ArgoCD', sub: 'GitOps', icon: 'i-simple-icons:argo', deps: ['git', 'pkg'] },
  { id: 'awx', name: 'AWX', sub: 'Automasjon', icon: 'i-simple-icons:ansible', deps: ['git', 'pkg'] },
  { id: 'ci', name: 'CI/CD-runnere', sub: 'Bygg og utrulling', icon: 'i-carbon:flow', deps: ['git', 'pkg'] },
  { id: 'scr', name: 'Manuelle scripts', sub: 'Drift og beredskap', icon: 'i-carbon:terminal', deps: ['git'] },
  { id: 'bp', name: 'Backport', sub: 'Sårbarhetspatching', icon: 'i-carbon:security', deps: ['git', 'pkg'] },
]

export const apps: { id: string; name: string; sub: string; icon: string }[] = [
  { id: 'dips', name: 'DIPS', sub: 'Kubernetes · ArgoCD', icon: 'i-carbon:health-cross' },
  { id: 'mv', name: 'MetaVision', sub: 'PowerShell DSC · Choco', icon: 'i-carbon:activity' },
  { id: 'p360', name: 'Public 360', sub: 'CI/CD · Ansible', icon: 'i-carbon:document' },
]

// Hva skjer med vedlikehold og drift av applikasjonen (applikasjonen selv kjører videre i alle scenarioer)
export const impact: Record<string, Record<Scenario, { level: Level; text: string }>> = {
  dips: {
    git: { level: 'stop', text: 'Drift og vedlikehold stopper' },
    pkg: { level: 'stop', text: 'Drift og vedlikehold stopper' },
    both: { level: 'stop', text: 'Stopper. Omveier kan gjøre skade' },
  },
  mv: {
    git: { level: 'manual', text: 'Mulig med oppdatert lokal kopi' },
    pkg: { level: 'stop', text: 'Stopper, ingen gode alternativer' },
    both: { level: 'stop', text: 'Vedlikehold stopper' },
  },
  p360: {
    git: { level: 'manual', text: 'Mulig med fersk lokal kopi' },
    pkg: { level: 'manual', text: 'Mulig med lokal overstyring' },
    both: { level: 'manual', text: 'Mulig manuelt, men krevende' },
  },
}
