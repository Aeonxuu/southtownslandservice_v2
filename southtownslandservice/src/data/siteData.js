const mediaRoot = '/media';

// Project photos and the hero video are served from Cloudinary, not this repo.
// `f_auto` negotiates WebP/AVIF per browser, `q_auto` picks a quality level, and the
// width cap stops us shipping full-resolution originals into small containers.
const CLOUDINARY = 'https://res.cloudinary.com/fzwunkn3';
const cldImage = (path, transform) => `${CLOUDINARY}/image/upload/${transform}/southtowns/${path}`;
const cldVideo = (path, transform) => `${CLOUDINARY}/video/upload/${transform}/southtowns/${path}`;

const COVER_TRANSFORM = 'f_auto,q_auto,w_800';    // job card in the grid
const GALLERY_TRANSFORM = 'f_auto,q_auto,w_1600'; // main image in the detail modal
const THUMB_TRANSFORM = 'f_auto,q_auto,w_200';    // thumbnail strip in the detail modal

const buildJob = (id, title, description, imageCount, categories = []) => {
  // Cloudinary public IDs are flat and extension-less: jobs/42-cover, jobs/42-1, ...
  const paths = [`jobs/${id}-cover`, ...Array.from({ length: imageCount }, (_, index) => `jobs/${id}-${index + 1}`)];

  return {
    id,
    title,
    description,
    categories: Array.isArray(categories) ? categories : categories ? [categories] : [],
    // The cover photo is also images[0], but the card renders it much smaller than the
    // modal does, so each gets its own width rather than sharing one compromise size.
    cover: cldImage(paths[0], COVER_TRANSFORM),
    images: paths.map((path) => cldImage(path, GALLERY_TRANSFORM)),
    // Parallel array of the same photos at thumbnail size. The strip renders these at
    // ~80px, so pointing it at `images` would pull full-size files for every photo.
    thumbnails: paths.map((path) => cldImage(path, THUMB_TRANSFORM))
  };
};

export const brand = {
  name: 'Southtowns Land Service',
  fullName: 'Southtowns Land Service',
  footer: 'Southtowns Land Service LLC by Lalaine DC',
  logo: `${mediaRoot}/icons/business_icon.png`,
  heroVideo: cldVideo('background/bg', 'f_auto,q_auto')
};

export const hero = {
  eyebrow: 'WELCOME TO',
  titleTop: 'SOUTHTOWNS',
  titleBottom: 'LAND SERVICE',
  primaryCta: {
    label: 'FREE ESTIMATE',
    href: 'https://www.facebook.com/southtownslandservice'
  },
  secondaryCta: {
    label: 'VIEW JOBS',
    href: '/jobs'
  }
};

export const benefits = [
  {
    title: 'Integrity',
    description: 'We offer honest, upfront dealings and free estimates, ensuring there are never any hidden costs or surprises in your project'
  },
  {
    title: 'Experience',
    description: 'Our skilled team provides professional land clearing, maintenance, and excavation services for any residential or commercial need'
  },
  {
    title: 'Dependability',
    description: 'From small fields to major grading, we promise reliable service to complete your project needs fully and on time'
  }
];

export const stats = [
  { value: '49+', label: 'Projects Completed' },
  { value: '18', label: 'Services Offered' },
  { value: 'Free', label: 'Estimates' },
  { value: 'Fully Insured', label: 'Licensed LLC' }
];

export const services = [
  {
    title: 'Site Development & Heavy Excavation',
    jobs: [
      'Excavation and Grading',
      'Site prep / Site work',
      'Drainage and Ditching',
      'Trenching',
      'Culvert Pipe Installation',
      'Septic, Sewer Repair and Installation',
      'Foundation Excavation',
    ],
    image: cldImage('services/1', 'f_auto,q_auto,w_800'),
    category: 'Excavation'
  },
  {
    title: 'Property Maintenance & Landscaping',
    jobs: [
      'Plowing and Snow blowing',
      'New Lawn Installation',
      'Landscaping',
      'Sonotubes and Post-hole Digging',
    ],
    image: cldImage('services/2', 'f_auto,q_auto,w_800'),
    category: 'Snow Management'
  },
  {
    title: 'Material & Surface Work',
    jobs: [
      'Stone Driveways and Access Roads',
      'Ponds',
      'Trucking',
      'Stone, Mulch and Topsoil Delivery',
    ],
    image: cldImage('services/3', 'f_auto,q_auto,w_800'),
    category: 'Driveway'
  },
  {
    title: 'Land & Vegetation Clearing',
    jobs: [
      'Land Clearing',
      'Brush Hogging',
      'Forestry Mulching',
    ],
    image: cldImage('services/4', 'f_auto,q_auto,w_800'),
    category: 'Brush Hogging'
  }
];

export const serviceAreas = {
  headline: 'Proudly Serving Western New York',
  regions: ['Erie County', 'Chautauqua County', 'Wyoming County', 'Cattaraugus County'],
  towns: [
    'Boston', 'Eden', 'Hamburg', 'Angola', 'Derby',
    'Lake View', 'Evans', 'Orchard Park', 'East Aurora',
    'Springville', 'Holland', 'Colden', 'Elma', 'Marilla'
  ],
  note: 'Not seeing your area? Give us a call — we travel for the right project.'
};

export const contacts = [
  {
    type: 'Facebook',
    label: 'Southtowns Land Service',
    href: 'https://www.facebook.com/southtownslandservice',
    icon: 'facebook'
  },
  {
    type: 'BBB',
    label: 'Southtowns Land Service LLC',
    href: 'https://www.bbb.org/us/ny/boston/profile/excavating-contractors/southtowns-land-service-llc-0041-236029104/#sealclick',
    icon: 'badge'
  },
  {
    type: 'Yelp',
    label: 'SOUTHTOWNS LAND SERVICE',
    href: 'https://www.yelp.com/biz/southtowns-land-service-boston',
    icon: 'star'
  },
  {
    type: 'Phone',
    label: 'Call +1-716-983-6564',
    href: 'tel:+1-716-983-6564',
    icon: 'phone'
  },
  {
    type: 'Email',
    label: 'southtownslandservice@gmail.com',
    href: 'mailto:southtownslandservice@gmail.com',
    icon: 'mail'
  }
];

export const reviews = [];

export const jobs = [
  buildJob(1, 'Brush Hogging', 'Powerful brush hogging equipment cuts down thick overgrowth to reclaim unused land for maintenance or development.', 2, ['Brush Hogging']),
  buildJob(2, 'Brush hogging and forestry mulching', 'Heavy-duty tractor attachments clear challenging overgrown areas using brush hogging for fields or forestry mulching for denser woods.', 2, ['Brush Hogging', 'Forestry Mulching']),
  buildJob(3, 'Brush hogging and forestry mulching', 'Specialized equipment quickly clears large areas of dense brush and small trees using brush hogging or forestry mulching.', 1, ['Forestry Mulching', 'Brush Hogging']),
  buildJob(4, 'Brush Hogging', 'Heavy-duty brush hogging equipment clears dense brush and vegetation over large areas, reclaiming overgrown land.', 1, ['Brush Hogging']),
  buildJob(5, 'Plowing and Disking', 'Specialized tractor equipment plows and disks the field to turn and prepare the soil for planting or landscaping.', 1, ['Grading & Leveling']),
  buildJob(6, 'Stump Removal', 'Specialized clearing and stump removal equipment grinds down and removes remaining stumps after mulching.', 1, ['Stump Removal', 'Forestry Mulching']),
  buildJob(7, 'Stump grinding', 'Specialized stump grinding machinery removes stumps and root systems, leveling the ground for landscaping or construction.', 1, ['Stump Removal']),
  buildJob(8, 'Tree stump removal', 'Stump grinding and yard cleanup equipment remove stumps and debris to make the yard usable again.', 1, ['Stump Removal']),
  buildJob(9, 'Tree stump removal', 'Heavy-duty stump grinding equipment removes tree stumps and creates a smooth surface for landscaping or construction.', 1, ['Stump Removal', 'Grading & Leveling']),
  buildJob(10, 'Getting overgrown areas in control', 'Brush hogging and forestry mulching equipment clear overgrown areas and reclaim land for use or development.', 1, ['Brush Hogging', 'Forestry Mulching']),
  buildJob(11, 'Tree removal', 'Fallen trees and winter debris are removed, with snow removal services also mentioned for accessibility and safety.', 1, ['Brush Hogging', 'Snow Management']),
  buildJob(12, 'Installing Culvert', 'Excavation and installation techniques replace old culverts or install new drainage systems.', 3, ['Drainage & Utilities', 'Excavation']),
  buildJob(13, 'Septic Repair', 'Excavation and repair techniques address septic system issues by repairing or replacing damaged components.', 1, ['Drainage & Utilities', 'Excavation']),
  buildJob(14, 'Water and electric line installation', 'Trenching and utility installation equipment install new water and electric lines with minimal disruption.', 1, ['Drainage & Utilities']),
  buildJob(15, 'Removing structure and restoration', 'Excavation equipment and grading remove an old pool and deck structure, then restore the area with soil and grass seed.', 1, ['Excavation', 'Grading & Leveling']),
  buildJob(16, 'Opening and leveling lot', 'Land clearing and grading equipment open and level a new lot, then finish it with new grass.', 1, ['Grading & Leveling', 'Brush Hogging']),
  buildJob(17, 'Reclaiming garden beds', 'Old retaining walls are removed and replaced, while a matching garden box and garden-bed reclamation are built.', 1, ['Grading & Leveling']),
  buildJob(18, 'Dig out old pool foundation', 'Excavation and grading remove old concrete pool foundations and finish the area with topsoil and grass seed.', 1, ['Excavation', 'Grading & Leveling']),
  buildJob(19, 'Installing smooth sand base', 'Excavation and leveling create a smooth sand base for a new pool installation.', 1, ['Grading & Leveling', 'Excavation']),
  buildJob(20, 'Forestry Mulching', 'Appropriate equipment removes unwanted vegetation and debris for a small-scale clearing project.', 4, ['Forestry Mulching']),
  buildJob(21, 'Site preparation', 'The site is cleared and graded, with an access driveway, foundation pad, and utilities installed for a new barn.', 1, ['Grading & Leveling', 'Driveway', 'Drainage & Utilities']),
  buildJob(22, 'Backyard pathway', 'Excavation equipment and stone materials create level stone walkways or access points after removing obstacles and filling drop-offs.', 2, ['Grading & Leveling', 'Excavation']),
  buildJob(23, 'Lot clearing', 'Comprehensive lot clearing and grading leave the area ready for soil and seed.', 1, ['Brush Hogging', 'Grading & Leveling']),
  buildJob(24, 'Construction Access Installation', 'A durable construction driveway and parking area are cut in to support a future home build site.', 1, ['Driveway']),
  buildJob(25, 'Smoothing out yard', 'The rough, bumpy yard is smoothed and leveled to eliminate difficult mowing conditions.', 1, ['Grading & Leveling']),
  buildJob(26, 'Driveway renewal', 'Grading and material application renew and widen the existing driveway for better function and curb appeal.', 1, ['Driveway', 'Grading & Leveling']),
  buildJob(27, 'Driveway Renewal with millings', 'The old surface is cleared and leveled, then millings are applied for a durable renewed driveway.', 1, ['Driveway']),
  buildJob(28, 'Renovate muddy driveway', 'Grading equipment and fresh stone repair a muddy driveway and create a cleaner access road.', 1, ['Driveway', 'Grading & Leveling']),
  buildJob(29, 'New driveway', 'The property is transformed with new driveways, grading, stump grinding, excavation, forestry mulching, and brush hogging.', 1, ['Driveway', 'Grading & Leveling', 'Stump Removal', 'Excavation', 'Forestry Mulching', 'Brush Hogging']),
  buildJob(30, 'Driveway renewal', 'Grading and material application renew and widen the existing driveway for better function and curb appeal.', 1, ['Driveway', 'Grading & Leveling']),
  buildJob(31, 'Driveway renewal', 'Grading and material application renew the driveway and expand its size for better access and usability.', 6, ['Driveway', 'Grading & Leveling']),
  buildJob(32, 'Driveway renewal', 'The driveway is renewed through grading and durable asphalt millings.', 1, ['Driveway']),
  buildJob(33, 'Parking lot extension', 'Heavy machinery and quality materials expand the parking lot and renew the driveway after winter damage.', 1, ['Driveway', 'Grading & Leveling']),
  buildJob(34, 'Driveway expansion', 'The driveway is renewed and expanded to increase width, length, access, and surface quality.', 1, ['Driveway']),
  buildJob(35, 'Driveway expansion', 'Functional loop entrances and exits are built so vehicles can drive in and out safely without reversing.', 1, ['Driveway']),
  buildJob(36, 'Driveway expansion', 'The area beside the garage is excavated and extended, then finished with landscape fabric and fresh stone.', 1, ['Driveway', 'Excavation']),
  buildJob(37, 'Site Preparation and Land Transformation', 'Brush and timber are cleared around the residence, followed by precision regrading to create a functional landscape.', 1, ['Grading & Leveling', 'Brush Hogging']),
  buildJob(38, 'Commercial Snow Management', 'Heavy-duty vehicles and equipment clear parking lots quickly and strip surfaces back to pavement for safe access.', 6, ['Snow Management']),
  buildJob(39, 'Snow Relocation & Stacking', 'Loaders and specialized machinery relocate snow piles away from high-traffic zones to maximize parking and visibility.', 4, ['Snow Management']),
  buildJob(40, 'Residential Drainage & Trenching Solutions', 'Specialized equipment installs drainage systems that manage water flow and help prevent flooding.', 4, ['Drainage & Utilities']),
  buildJob(41, 'Underground Utility Trenching & Site Prep', 'Precision trenching installs underground utility lines, protective vaults, and meter pedestals for secure access.', 6, ['Drainage & Utilities', 'Excavation']),
  buildJob(42, 'Foundation Excavation & Site Development', 'Large-scale foundation excavation creates a flat stable base and deep-trench site prep for new construction.', 19, ['Excavation', 'Grading & Leveling']),
  buildJob(43, 'Waterfall Stream Reclamation & Erosion Control', 'The waterway is restored, the slope reshaped, and boulder landscaping added to stabilize the bridge crossing and waterfall edge.', 4, ['Drainage & Utilities', 'Grading & Leveling']),
  buildJob(44, 'Driveway Expansion & Shed Pad Installation', 'We expanded this driveway for additional parking and installed a precision-leveled, raised pad to provide a solid foundation for a new shed.', 10, ['Driveway', 'Grading & Leveling']),
  buildJob(45, 'New Cabin Utility & Driveway Completion', 'We installed the final electrical and water service lines for a new cabin and completed the driveway. Next, we move into the drainage and septic phases.', 13, ['Drainage & Utilities', 'Driveway']),
  buildJob(46, 'Driveway, Drainage & Pavilion Site Prep', 'We installed a new driveway with integrated ditching and dual culverts, alongside a precision-leveled building pad for a new pavilion overlooking the pond.', 12, ['Driveway', 'Drainage & Utilities', 'Grading & Leveling']),
  buildJob(47, 'New Construction Site Reclamation & Final Grade', 'We cleared post-construction debris following a winter build, re-graded the entire lot for hydroseeding prep, and established a newly graded driveway and dedicated parking area.', 15, ['Grading & Leveling', 'Driveway']),
  buildJob(48, 'Complete Septic System, Shed Pad & Water Service', 'Our team installed a full new septic system from scratch, covering the tank, leach field, and absorption bed, all of which passed final inspection and are good to go. We also ran a new water service line, built a shed foundation pad, and put in a heavy amount of grading work across the property to get it shaped up and ready for landscaping down the road.', 10, ['Drainage & Utilities', 'Grading & Leveling', 'Excavation']),
  buildJob(49, 'Barn Site Work, Driveway & Foundation Excavation', 'Complete site work for a new barn build. We put in a new gravel driveway, excavated the foundation, and dug the footers and drainage. The building pad is graded, compacted, and ready for concrete.', 17, ['Excavation', 'Driveway', 'Drainage & Utilities', 'Grading & Leveling']),
  buildJob(50, 'New access road & building pad', 'Cleared and graded a new access road through wooded terrain to reach the building site for a client\'s cabin. The dozer was hauled in on a tandem-axle trailer to handle the site work, cutting a stable path through mixed hardwood with proper drainage crown and compacted base. Final grade leaves a clean, driveable surface ready for construction traffic and future gravel or paving.', 8, ['Driveway', 'Grading & Leveling', 'Forestry Mulching']),
  buildJob(51, 'Yard regrade and lawn prep after septic work', 'Regraded and tilled the yard after septic system work to restore a level, workable surface. Used a skid steer with a tiller attachment to break up compacted soil and blend the disturbed area into the surrounding lawn, prepping the ground for new grass. Even grading and loose topsoil give the seed a real shot at taking root and matching the rest of the yard.', 12, ['Grading & Leveling']),
  buildJob(52, 'Steep yard regrade and retaining wall rebuild', 'Took a steep, overgrown yard that couldn\'t be mowed and regraded the whole property into a flat, usable lawn. Cleared the brush and trees off the slope, tore out the failing retaining wall, and rebuilt it with added height and proper drainage behind it so water moves through instead of pushing on the block. The finished grade was seeded and strawed to hold the soil while the new lawn fills in. Next phase is wire mesh, mortar, and a stone face to tie all the walls together into a finished product.', 14, ['Grading & Leveling', 'Excavation', 'Drainage & Utilities', 'Brush Hogging']),
  buildJob(53, 'Yard drainage line install and lawn restoration', 'Trenched across the front yard to install a new drainage line, running solid pipe with elbow fittings and finishing the low end with a grated drain at the edge of the concrete. Backfilled the trench, regraded the disturbed ground and laid straw over the whole strip to hold the soil while the grass comes back. Small job, but it gives water a clear path out of the yard and leaves the lawn ready to recover.', 6, ['Drainage & Utilities', 'Excavation'])
];

export const featuredJobs = jobs.filter((job) => job.id === 42 || job.id === 43 || job.id === 44 || job.id === 45 || job.id === 46 || job.id === 47 || job.id === 49);
