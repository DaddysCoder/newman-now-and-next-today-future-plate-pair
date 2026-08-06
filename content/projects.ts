export type Theme = 'water' | 'move' | 'green' | 'place'

export interface Hotspot {
  id: string
  title: string
  body: string
  x: number
  y: number
}

export interface NarrationLine {
  t: number
  text: string
}

export interface Project {
  slug: string
  chapter: number
  name: string
  theme: Theme
  status: 'Future proposal'
  summary: string
  outcomes: { title: string; body: string }[]
  hotspots: Hotspot[]
  narration: NarrationLine[]
  described: { today: string; future: string }
  images: { today: string; future: string; thumb: string }
  map: { x: number; y: number }
}

export interface ProjectPlaceholder {
  slug: string
  name: string
  placeholder: true
}

export type ProjectEntry = Project | ProjectPlaceholder

export const aquaticCentre: Project = {
  slug: 'newman-aquatic-centre',
  chapter: 4,
  name: 'Newman Aquatic Centre',
  theme: 'water',
  status: 'Future proposal',
  summary:
    'A community aquatic centre is being explored for open ground at the edge of the Newman townsite. The proposal could bring swimming, water play, shade and planted areas together in one place.',
  outcomes: [
    {
      title: 'A place to swim',
      body: 'The proposal could create a community setting for swimming and recreation.',
    },
    {
      title: 'Water play and shade',
      body: 'A smaller shallow water-play area could sit beneath blue shade sails.',
    },
    {
      title: 'A cooler landscape',
      body: 'Trees, planted ground and a clear path could make the open site more comfortable to move through.',
    },
  ],
  hotspots: [
    {
      id: 'main-pool',
      title: 'Swimming pool',
      body: 'A swimming pool is shown in front of the proposed low community building.',
      x: 54,
      y: 58,
    },
    {
      id: 'water-play',
      title: 'Shaded water play',
      body: 'A smaller shallow play area is being explored beneath blue shade sails.',
      x: 73,
      y: 55,
    },
    {
      id: 'solar-roof',
      title: 'Rooftop solar',
      body: 'The concept shows solar panels across part of the building’s dark roof.',
      x: 55,
      y: 37,
    },
    {
      id: 'landscape-path',
      title: 'Trees and path',
      body: 'New planting and a path could connect the roadside edge with the entrance.',
      x: 35,
      y: 69,
    },
  ],
  narration: [
    {
      t: 0,
      text: 'This open red-earth site sits at the edge of Newman, looking toward the flat-topped Pilbara ranges.',
    },
    {
      t: 8,
      text: 'A community aquatic centre is being explored here as a future proposal.',
    },
    {
      t: 17,
      text: 'The concept brings a swimming pool and a smaller shaded water-play area in front of a low building.',
    },
    {
      t: 28,
      text: 'Trees, planted ground and a path could create shade and a clearer arrival from the road.',
    },
    {
      t: 39,
      text: 'This indicative visualisation is an invitation to consider the possible change. Nothing shown is approved or built.',
    },
  ],
  described: {
    today:
      'The site today is open red-ochre ground with low spinifex, gravel and informal vehicle tracks. There are no buildings or shade structures on the site. Flat-topped Pilbara ranges sit along the horizon in warm late-afternoon light.',
    future:
      'The indicative future view keeps the same road, horizon, ranges and late-afternoon light. It adds a low single-storey community building with a dark roof and rooftop solar, a swimming pool in front, a smaller shallow water-play area beneath blue shade sails, planted trees and ground cover, and a path from the road to the entrance.',
  },
  images: {
    today: '/images/site-today.png',
    future: '/images/site-future.png',
    thumb: '/images/site-future.png',
  },
  map: { x: 62, y: 45 },
}

// The supplied build brief does not include the approved names for chapters 1–3
// and 5–7. These entries remain explicit placeholders rather than inventing names.
export const projects: ProjectEntry[] = [
  { slug: 'chapter-1-pending', name: 'Project name pending', placeholder: true },
  { slug: 'chapter-2-pending', name: 'Project name pending', placeholder: true },
  { slug: 'chapter-3-pending', name: 'Project name pending', placeholder: true },
  aquaticCentre,
  { slug: 'chapter-5-pending', name: 'Project name pending', placeholder: true },
  { slug: 'chapter-6-pending', name: 'Project name pending', placeholder: true },
  { slug: 'chapter-7-pending', name: 'Project name pending', placeholder: true },
  { slug: 'chapter-8-pending', name: 'Shire project register pending', placeholder: true },
  { slug: 'chapter-9-pending', name: 'Shire project register pending', placeholder: true },
  { slug: 'chapter-10-pending', name: 'Shire project register pending', placeholder: true },
  { slug: 'chapter-11-pending', name: 'Shire project register pending', placeholder: true },
  { slug: 'chapter-12-pending', name: 'Shire project register pending', placeholder: true },
  { slug: 'chapter-13-pending', name: 'Shire project register pending', placeholder: true },
]

export function isAuthoredProject(project: ProjectEntry): project is Project {
  return !('placeholder' in project)
}
