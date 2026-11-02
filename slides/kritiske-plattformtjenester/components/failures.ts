// Felles data for FailureGrid og FailureSpectrum: feil der Git og pakkebrønnen svarer, men ikke fungerer

export const failures: {
  id: string
  title: string
  icon: string
  examples: string[]
  noticed: string
}[] = [
  {
    id: 'down',
    title: 'Tjenesten er nede',
    icon: 'i-carbon:close-filled',
    examples: ['Git eller pakkebrønnen svarer ikke'],
    noticed: 'Alle merker det med en gang',
  },
  {
    id: 'partial',
    title: 'Deler av tjenesten svikter',
    icon: 'i-carbon:flow',
    examples: ['CI/CD-runnere som er nede, fulle eller har lange køer', 'Enkeltprosjekter eller repo med problemer'],
    noticed: 'Noen team merker det',
  },
  {
    id: 'config',
    title: 'Noe er feil satt opp',
    icon: 'i-carbon:settings-adjust',
    examples: ['Feilkonfigurasjon etter en endring', 'Feil rettigheter og tilganger'],
    noticed: 'Oppdages når andre starter vedlikehold',
  },
  {
    id: 'expired',
    title: 'Noe har utløpt',
    icon: 'i-carbon:certificate',
    examples: ['Sertifikater på tjenesten eller støttekomponenter', 'Tokens og deploy keys'],
    noticed: 'Plutselig, med kryptiske feilmeldinger',
  },
  {
    id: 'content',
    title: 'Innholdet er feil',
    icon: 'i-carbon:package',
    examples: ['Synk av leverandørpakker har stoppet', 'Skanneren blokkerer pakker'],
    noticed: 'Kan gå uker før noen merker det',
  },
]
