// Announcement Photo for each fellowship
export function getFellowshipPhoto(fellowship) {
  switch (fellowship) {
    case 'all':
      return 'https://i.ibb.co/sWLSpw0/Screen-Shot-2021-02-20-at-12-44-03-AM.png';
    case 'angels':
      return 'https://i.ibb.co/TWkJ7Sy/angels.png';
    case 'founders':
      return 'https://i.ibb.co/ZgwKprC/founders.png';
    case 'writers':
      return 'https://i.ibb.co/Q92fRjw/writers.png';
    default:
      return '';
  }
}
