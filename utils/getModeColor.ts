export const getModeColor = (
  type: '프로젝트' | '스터디' | '모각코' | '과외',
) => {
  switch (type) {
    case '프로젝트':
      return '#0d6efd';
    case '스터디':
      return '#f1e05a';
    case '모각코':
      return '#DA5B0B';
    case '과외':
      return '#178600';
    default:
      return '#000000';
  }
};
