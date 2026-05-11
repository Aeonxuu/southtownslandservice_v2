const mediaRoot = '/media';
const jobsRoot = `${mediaRoot}/jobs`;

const buildJob = (id, title, description, imageCount, extension = 'png') => ({
  id,
  title,
  description,
  images: [
    `${jobsRoot}/${id}/cover.${extension}`,
    ...Array.from({ length: imageCount }, (_, index) => `${jobsRoot}/${id}/${index + 1}.${extension}`)
  ]
});

export const brand = {
  name: 'Southtowns Land Service',
  fullName: 'Southtowns Land Service',
  footer: 'Southtowns Land Service LLC by Lalaine DC',
  logo: `${mediaRoot}/icons/business_icon.png`,
  heroVideo: `${mediaRoot}/background/bg.mp4`
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
    label: 'VIEW SERVICES',
    href: '#services'
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

export const services = [
  {
    title: 'Service 1',
    image: `${mediaRoot}/services/1.png`
  },
  {
    title: 'Service 4',
    image: `${mediaRoot}/services/4.png`
  },
  {
    title: 'Service 3',
    image: `${mediaRoot}/services/3.png`
  },
  {
    title: 'Service 2',
    image: `${mediaRoot}/services/2.png`
  }
];

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
  buildJob(1, 'Brush Hogging', 'Powerful brush hogging equipment cuts down thick overgrowth to reclaim unused land for maintenance or development.', 2),
  buildJob(2, 'Brush hogging and forestry mulching', 'Heavy-duty tractor attachments clear challenging overgrown areas using brush hogging for fields or forestry mulching for denser woods.', 2),
  buildJob(3, 'Brush hogging and forestry mulching', 'Specialized equipment quickly clears large areas of dense brush and small trees using brush hogging or forestry mulching.', 1),
  buildJob(4, 'Brush Hogging', 'Heavy-duty brush hogging equipment clears dense brush and vegetation over large areas, reclaiming overgrown land.', 1),
  buildJob(5, 'Plowing and Disking', 'Specialized tractor equipment plows and disks the field to turn and prepare the soil for planting or landscaping.', 1),
  buildJob(6, 'Stump Removal', 'Query successful. Specialized clearing and stump removal equipment grinds down and removes remaining stumps after mulching.', 1),
  buildJob(7, 'Stump grinding', 'Specialized stump grinding machinery removes stumps and root systems, leveling the ground for landscaping or construction.', 1),
  buildJob(8, 'Tree stump removal', 'Stump grinding and yard cleanup equipment remove stumps and debris to make the yard usable again.', 1),
  buildJob(9, 'Tree stump removal', 'Heavy-duty stump grinding equipment removes tree stumps and creates a smooth surface for landscaping or construction.', 1),
  buildJob(10, 'Getting overgrown areas in control', 'Brush hogging and forestry mulching equipment clear overgrown areas and reclaim land for use or development.', 1),
  buildJob(11, 'Tree removal', 'Fallen trees and winter debris are removed, with snow removal services also mentioned for accessibility and safety.', 1),
  buildJob(12, 'Installing Culvert', 'Excavation and installation techniques replace old culverts or install new drainage systems.', 3),
  buildJob(13, 'Septic Repair', 'Excavation and repair techniques address septic system issues by repairing or replacing damaged components.', 1),
  buildJob(14, 'Water and electric line installation', 'Trenching and utility installation equipment install new water and electric lines with minimal disruption.', 1),
  buildJob(15, 'Removing structure and restoration', 'Excavation equipment and grading remove an old pool and deck structure, then restore the area with soil and grass seed.', 1),
  buildJob(16, 'Opening and leveling lot', 'Land clearing and grading equipment open and level a new lot, then finish it with new grass.', 1),
  buildJob(17, 'Reclaiming garden beds', 'Old retaining walls are removed and replaced, while a matching garden box and garden-bed reclamation are built.', 1),
  buildJob(18, 'Dig out old pool foundation', 'Excavation and grading remove old concrete pool foundations and finish the area with topsoil and grass seed.', 1),
  buildJob(19, 'Installing smooth sand base', 'Excavation and leveling create a smooth sand base for a new pool installation.', 1),
  buildJob(20, 'Forestry Mulching', 'Appropriate equipment removes unwanted vegetation and debris for a small-scale clearing project.', 4, 'jpg'),
  buildJob(21, 'Site preparation', 'The site is cleared and graded, with an access driveway, foundation pad, and utilities installed for a new barn.', 1),
  buildJob(22, 'Backyard pathway', 'Excavation equipment and stone materials create level stone walkways or access points after removing obstacles and filling drop-offs.', 2),
  buildJob(23, 'Lot clearing', 'Comprehensive lot clearing and grading leave the area ready for soil and seed.', 1),
  buildJob(24, 'Construction Access Installation', 'A durable construction driveway and parking area are cut in to support a future home build site.', 1),
  buildJob(25, 'Smoothing out yard', 'The rough, bumpy yard is smoothed and leveled to eliminate difficult mowing conditions.', 1),
  buildJob(26, 'Driveway renewal', 'Grading and material application renew and widen the existing driveway for better function and curb appeal.', 1),
  buildJob(27, 'Driveway Renewal with millings', 'The old surface is cleared and leveled, then millings are applied for a durable renewed driveway.', 1),
  buildJob(28, 'Renovate muddy driveway', 'Grading equipment and fresh stone repair a muddy driveway and create a cleaner access road.', 1),
  buildJob(29, 'New driveway', 'The property is transformed with new driveways, grading, stump grinding, excavation, forestry mulching, and brush hogging.', 1),
  buildJob(30, 'Driveway renewal', 'Grading and material application renew and widen the existing driveway for better function and curb appeal.', 1),
  {
    id: 31,
    title: 'Driveway renewal',
    description: 'Grading and material application renew the driveway and expand its size for better access and usability.',
    images: [
      `${jobsRoot}/31/cover.png`,
      `${jobsRoot}/31/1.png`,
      `${jobsRoot}/31/2.jpg`,
      `${jobsRoot}/31/3.jpg`,
      `${jobsRoot}/31/4.jpg`,
      `${jobsRoot}/31/5.jpg`,
      `${jobsRoot}/31/6.jpg`
    ]
  },
  buildJob(32, 'Driveway renewal', 'The driveway is renewed through grading and durable asphalt millings.', 1),
  buildJob(33, 'Parking lot extension', 'Heavy machinery and quality materials expand the parking lot and renew the driveway after winter damage.', 1),
  buildJob(34, 'Driveway expansion', 'The driveway is renewed and expanded to increase width, length, access, and surface quality.', 1),
  buildJob(35, 'Driveway expansion', 'Functional loop entrances and exits are built so vehicles can drive in and out safely without reversing.', 1),
  buildJob(36, 'Driveway expansion', 'The area beside the garage is excavated and extended, then finished with landscape fabric and fresh stone.', 1),
  buildJob(37, 'Site Preparation and Land Transformation', 'Brush and timber are cleared around the residence, followed by precision regrading to create a functional landscape.', 1),
  buildJob(38, 'Commercial Snow Management', 'Heavy-duty vehicles and equipment clear parking lots quickly and strip surfaces back to pavement for safe access.', 6),
  buildJob(39, 'Snow Relocation & Stacking', 'Loaders and specialized machinery relocate snow piles away from high-traffic zones to maximize parking and visibility.', 4),
  buildJob(40, 'Residential Drainage & Trenching Solutions', 'Specialized equipment installs drainage systems that manage water flow and help prevent flooding.', 4),
  buildJob(41, 'Underground Utility Trenching & Site Prep', 'Precision trenching installs underground utility lines, protective vaults, and meter pedestals for secure access.', 6),
  buildJob(42, 'Foundation Excavation & Site Development', 'Large-scale foundation excavation creates a flat stable base and deep-trench site prep for new construction.', 19, 'jpg'),
  buildJob(43, 'Waterfall Stream Reclamation & Erosion Control', 'The waterway is restored, the slope reshaped, and boulder landscaping added to stabilize the bridge crossing and waterfall edge.', 4, 'jpg'),
  buildJob(44, 'Driveway Expansion & Shed Pad Installation', 'We expanded this driveway for additional parking and installed a precision-leveled, raised pad to provide a solid foundation for a new shed.', 10, 'jpg'),
  buildJob(45, 'New Cabin Utility & Driveway Completion', 'We installed the final electrical and water service lines for a new cabin and completed the driveway. Next, we move into the drainage and septic phases.', 13, 'jpg'),
  buildJob(46, 'Driveway, Drainage & Pavilion Site Prep', 'We installed a new driveway with integrated ditching and dual culverts, alongside a precision-leveled building pad for a new pavilion overlooking the pond.', 12, 'jpg')
];

export const featuredJobs = jobs.filter((job) => job.id === 42 || job.id === 43 || job.id === 44 || job.id === 45 || job.id === 46);
